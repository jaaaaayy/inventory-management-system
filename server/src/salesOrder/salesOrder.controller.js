import Customer from "../customer/customer.model.js";
import Inventory from "../inventory/inventory.model.js";
import Product from "../product/product.model.js";
import SalesItem from "../salesItem/salesItem.model.js";
import SalesOrder from "./salesOrder.model.js";
import mongoose from "mongoose";
import { withTransaction } from "../config/database.js";

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

    const findCustomer = await Customer.findById(customer);
    if (!findCustomer) {
      return response.status(400).send({ message: "Customer not found." });
    }

    const result = await withTransaction(async (session) => {
      const newSalesItems = [];
      let totalAmount = 0;
      const productQuantityMap = new Map();
      const productIds = [...new Set(items.map((item) => item.product))];
      const products = await Product.find({ _id: { $in: productIds } }).session(
        session
      );
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
          product: item.product,
          quantity,
          totalPrice,
        });
      }

      for (const [productId, totalQuantity] of productQuantityMap) {
        const updatedInventory = await Inventory.findOneAndUpdate(
          {
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
      }

      const newSalesOrder = new SalesOrder({
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
