import Customer from "../customer/customer.model.js";
import Inventory from "../inventory/inventory.model.js";
import Product from "../product/product.model.js";
import SalesItem from "../salesItem/salesItem.model.js";
import SalesOrder from "./salesOrder.model.js";
import mongoose from "mongoose";
import { withTransaction } from "../config/database.js";
import { recordStockMovement } from "../stockMovement/stockMovement.service.js";

const STATUS_TRANSITIONS = {
  Pending: ["Shipped", "Cancelled"],
  Shipped: ["Delivered", "Cancelled"],
  Delivered: [],
  Cancelled: [],
};

export const createSalesOrder = async (request, response) => {
  try {
    const { customer, orderDate, deliveryDate, items } = request.body;
    const errors = {};

    const startOfDay = (d) => {
      const x = new Date(d);
      x.setHours(0, 0, 0, 0);
      return x.getTime();
    };

    if (startOfDay(orderDate) < startOfDay(new Date())) {
      errors.orderDate = "Order date cannot be in the past.";
    }

    if (startOfDay(deliveryDate) < startOfDay(orderDate)) {
      errors.deliveryDate = "Delivery date cannot be before the order date.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    const findCustomer = await Customer.findOne({
      _id: customer,
      organization: request.organizationId,
    });
    if (!findCustomer) {
      return response.status(400).send({ message: "Customer not found." });
    }

    const result = await withTransaction(async (session) => {
      const newSalesItems = [];
      let totalAmount = 0;
      const productQuantityMap = new Map();
      const quantityAfterMap = new Map();
      const productIds = [...new Set(items.map((item) => item.product))];
      const products = await Product.find({
        _id: { $in: productIds },
        organization: request.organizationId,
      }).session(session);
      const productMap = new Map(
        products.map((product) => [product._id.toString(), product])
      );

      for (const productId of productIds) {
        if (!productMap.has(productId)) {
          const error = new Error(`Product ${productId} not found.`);
          error.statusCode = 400;
          throw error;
        }
      }

      for (const item of items) {
        const quantity = Number(item.quantity);

        productQuantityMap.set(
          item.product,
          (productQuantityMap.get(item.product) || 0) + quantity
        );

        const findProduct = productMap.get(item.product);
        const sellingPrice = Number(findProduct.sellingPrice.toString());

        const totalPrice = sellingPrice * quantity;
        totalAmount += totalPrice;

        newSalesItems.push({
          salesOrder: null,
          organization: request.organizationId,
          product: item.product,
          quantity,
          totalPrice,
        });
      }

      for (const [productId, totalQuantity] of productQuantityMap) {
        const updatedInventory = await Inventory.findOneAndUpdate(
          {
            organization: request.organizationId,
            product: productId,
            quantity: { $gte: totalQuantity },
          },
          {
            $inc: { quantity: -totalQuantity },
            $set: { lastStockUpdate: new Date() },
          },
          { session, new: true }
        );

        if (!updatedInventory) {
          const findInventory = await Inventory.findOne({
            organization: request.organizationId,
            product: productId,
          }).session(session);
          const error = new Error(
            `Insufficient stock for product ${productId}. Available quantity: ${
              findInventory?.quantity || 0
            }.`
          );
          error.statusCode = 400;
          throw error;
        }

        quantityAfterMap.set(productId, updatedInventory.quantity);
      }

      const newSalesOrder = new SalesOrder({
        organization: request.organizationId,
        customer,
        orderDate,
        deliveryDate,
        totalAmount,
      });
      await newSalesOrder.save({ session });

      for (const item of newSalesItems) {
        item.salesOrder = newSalesOrder._id;
      }

      const savedSalesItems = await SalesItem.insertMany(newSalesItems, {
        session,
      });

      for (const [productId, totalQuantity] of productQuantityMap) {
        await recordStockMovement(session, {
          organization: request.organizationId,
          product: productId,
          type: "Sale",
          delta: -totalQuantity,
          quantityAfter: quantityAfterMap.get(productId),
          user: request.userId,
          reference: newSalesOrder._id,
          referenceType: "SalesOrder",
        });
      }

      return {
        salesOrder: newSalesOrder,
        salesItems: savedSalesItems,
      };
    });

    response.status(201).send({
      message: "Sales order created successfully.",
      salesOrder: result.salesOrder,
      salesItems: result.salesItems,
    });
  } catch (error) {
    console.log(error.message);
    if (error.statusCode) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    response.status(500).json({
      message: "Failed to create sales order. Please try again.",
    });
  }
};

export const getAllSalesOrders = async (request, response) => {
  try {
    const salesOrders = await SalesOrder.aggregate([
      {
        $match: {
          organization: request.organizationId,
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: {
          path: "$customer",
        },
      },
      {
        $lookup: {
          from: "salesitems",
          localField: "_id",
          foreignField: "salesOrder",
          as: "items",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                product: {
                  $arrayElemAt: [
                    "$productDetails.name",
                    {
                      $indexOfArray: ["$productDetails._id", "$$item.product"],
                    },
                  ],
                },
                image: {
                  $arrayElemAt: [
                    "$productDetails.imageUrl",
                    {
                      $indexOfArray: ["$productDetails._id", "$$item.product"],
                    },
                  ],
                },
                quantity: "$$item.quantity",
                totalPrice: "$$item.totalPrice",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          organization: 1,
          customer: {
            $concat: ["$customer.firstName", " ", "$customer.lastName"],
          },
          orderDate: 1,
          deliveryDate: 1,
          totalAmount: { $toDouble: "$totalAmount" },
          status: 1,
          items: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    response.json({ salesOrders });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get all sales orders. Please try again.",
    });
  }
};

export const updateSalesOrderStatus = async (request, response) => {
  const {
    params: { id },
    body: { status },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid sales order id.",
      });
    }

    const salesOrder = await SalesOrder.findOne({
      _id: id,
      organization: request.organizationId,
    });
    if (!salesOrder) {
      return response.status(404).json({ message: "Sales order not found." });
    }

    if (status === salesOrder.status) {
      return response.status(400).json({
        message: `Sales order is already ${status}.`,
      });
    }

    const allowedTransitions = STATUS_TRANSITIONS[salesOrder.status] || [];
    if (!allowedTransitions.includes(status)) {
      return response.status(400).json({
        message: `Cannot change status from ${salesOrder.status} to ${status}.`,
      });
    }

    const updatedSalesOrder = await withTransaction(async (session) => {
      if (status === "Cancelled") {
        const salesItems = await SalesItem.find({
          salesOrder: id,
          organization: request.organizationId,
        }).session(session);

        const productQuantityMap = new Map();
        for (const item of salesItems) {
          const productId = item.product.toString();
          productQuantityMap.set(
            productId,
            (productQuantityMap.get(productId) || 0) + item.quantity
          );
        }

        for (const [productId, totalQuantity] of productQuantityMap) {
          const updatedInventory = await Inventory.findOneAndUpdate(
            { organization: request.organizationId, product: productId },
            {
              $inc: { quantity: totalQuantity },
              $set: { lastStockUpdate: new Date() },
            },
            { session, new: true }
          );

          await recordStockMovement(session, {
            organization: request.organizationId,
            product: productId,
            type: "Sale Cancelled",
            delta: totalQuantity,
            quantityAfter: updatedInventory.quantity,
            user: request.userId,
            reference: id,
            referenceType: "SalesOrder",
          });
        }
      }

      salesOrder.status = status;
      await salesOrder.save({ session });

      return salesOrder;
    });

    response.json({
      message: "Sales order status updated successfully.",
      salesOrder: updatedSalesOrder,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to update sales order status. Please try again.",
    });
  }
};

export const getSalesOrder = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid sales order id.",
      });
    }

    const salesOrders = await SalesOrder.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(id),
          organization: request.organizationId,
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: {
          path: "$customer",
        },
      },
      {
        $lookup: {
          from: "salesitems",
          localField: "_id",
          foreignField: "salesOrder",
          as: "items",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                _id: "$$item._id",
                product: {
                  $arrayElemAt: [
                    "$productDetails",
                    {
                      $indexOfArray: ["$productDetails._id", "$$item.product"],
                    },
                  ],
                },
                quantity: "$$item.quantity",
                totalPrice: { $toDouble: "$$item.totalPrice" },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          organization: 1,
          customer: 1,
          orderDate: 1,
          deliveryDate: 1,
          totalAmount: { $toDouble: "$totalAmount" },
          status: 1,
          items: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    if (salesOrders.length === 0) {
      return response.status(404).json({ message: "Sales order not found." });
    }

    const salesOrder = salesOrders[0];
    response.json({ salesOrder });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get sales order. Please try again.",
    });
  }
};
