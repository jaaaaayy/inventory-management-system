import Vendor from "../vendor/vendor.model.js";
import Inventory from "../inventory/inventory.model.js";
import Product from "../product/product.model.js";
import PurchaseItem from "../purchaseItem/purchaseItem.model.js";
import PurchaseOrder from "./purchaseOrder.model.js";
import mongoose from "mongoose";
import { withTransaction } from "../config/database.js";

const STATUS_TRANSITIONS = {
  Pending: ["Received", "Cancelled"],
  Received: [],
  Cancelled: [],
};

export const createPurchaseOrder = async (request, response) => {
  try {
    const { vendor, orderDate, expectedDate, items } = request.body;
    const errors = {};

    const startOfDay = (d) => {
      const x = new Date(d);
      x.setHours(0, 0, 0, 0);
      return x.getTime();
    };

    if (startOfDay(orderDate) < startOfDay(new Date())) {
      errors.orderDate = "Order date cannot be in the past.";
    }

    if (startOfDay(expectedDate) < startOfDay(orderDate)) {
      errors.expectedDate = "Expected date cannot be before the order date.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    const findVendor = await Vendor.findOne({
      _id: vendor,
      organization: request.organizationId,
    });
    if (!findVendor) {
      return response.status(400).send({ message: "Vendor not found." });
    }

    const result = await withTransaction(async (session) => {
      const newPurchaseItems = [];
      let totalAmount = 0;
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

        const findProduct = productMap.get(item.product);
        const costPrice = Number(findProduct.costPrice.toString());

        const totalPrice = costPrice * quantity;
        totalAmount += totalPrice;

        newPurchaseItems.push({
          purchaseOrder: null,
          organization: request.organizationId,
          product: item.product,
          quantity,
          totalPrice,
        });
      }

      const newPurchaseOrder = new PurchaseOrder({
        organization: request.organizationId,
        vendor,
        orderDate,
        expectedDate,
        totalAmount,
      });
      await newPurchaseOrder.save({ session });

      for (const item of newPurchaseItems) {
        item.purchaseOrder = newPurchaseOrder._id;
      }

      const savedPurchaseItems = await PurchaseItem.insertMany(
        newPurchaseItems,
        { session }
      );

      return {
        purchaseOrder: newPurchaseOrder,
        purchaseItems: savedPurchaseItems,
      };
    });

    response.status(201).send({
      message: "Purchase order created successfully.",
      purchaseOrder: result.purchaseOrder,
      purchaseItems: result.purchaseItems,
    });
  } catch (error) {
    console.log(error.message);
    if (error.statusCode) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    response.status(500).json({
      message: "Failed to create purchase order. Please try again.",
    });
  }
};

export const getAllPurchaseOrders = async (request, response) => {
  try {
    const purchaseOrders = await PurchaseOrder.aggregate([
      {
        $match: {
          organization: request.organizationId,
        },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendor",
        },
      },
      {
        $unwind: {
          path: "$vendor",
        },
      },
      {
        $lookup: {
          from: "purchaseitems",
          localField: "_id",
          foreignField: "purchaseOrder",
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
          vendor: "$vendor.name",
          orderDate: 1,
          expectedDate: 1,
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

    response.json({ purchaseOrders });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get all purchase orders. Please try again.",
    });
  }
};

export const updatePurchaseOrderStatus = async (request, response) => {
  const {
    params: { id },
    body: { status },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid purchase order id.",
      });
    }

    const purchaseOrder = await PurchaseOrder.findOne({
      _id: id,
      organization: request.organizationId,
    });
    if (!purchaseOrder) {
      return response.status(404).json({ message: "Purchase order not found." });
    }

    if (status === purchaseOrder.status) {
      return response.status(400).json({
        message: `Purchase order is already ${status}.`,
      });
    }

    const allowedTransitions = STATUS_TRANSITIONS[purchaseOrder.status] || [];
    if (!allowedTransitions.includes(status)) {
      return response.status(400).json({
        message: `Cannot change status from ${purchaseOrder.status} to ${status}.`,
      });
    }

    const updatedPurchaseOrder = await withTransaction(async (session) => {
      if (status === "Received") {
        const purchaseItems = await PurchaseItem.find({
          purchaseOrder: id,
          organization: request.organizationId,
        }).session(session);

        const productQuantityMap = new Map();
        for (const item of purchaseItems) {
          const productId = item.product.toString();
          productQuantityMap.set(
            productId,
            (productQuantityMap.get(productId) || 0) + item.quantity
          );
        }

        for (const [productId, totalQuantity] of productQuantityMap) {
          await Inventory.findOneAndUpdate(
            { organization: request.organizationId, product: productId },
            {
              $inc: { quantity: totalQuantity },
              $set: { lastStockUpdate: new Date() },
            },
            { session }
          );
        }
      }

      purchaseOrder.status = status;
      await purchaseOrder.save({ session });

      return purchaseOrder;
    });

    response.json({
      message: "Purchase order status updated successfully.",
      purchaseOrder: updatedPurchaseOrder,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to update purchase order status. Please try again.",
    });
  }
};

export const getPurchaseOrder = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid purchase order id.",
      });
    }

    const purchaseOrders = await PurchaseOrder.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(id),
          organization: request.organizationId,
        },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendor",
        },
      },
      {
        $unwind: {
          path: "$vendor",
        },
      },
      {
        $lookup: {
          from: "purchaseitems",
          localField: "_id",
          foreignField: "purchaseOrder",
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
          vendor: 1,
          orderDate: 1,
          expectedDate: 1,
          totalAmount: { $toDouble: "$totalAmount" },
          status: 1,
          items: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    if (purchaseOrders.length === 0) {
      return response.status(404).json({ message: "Purchase order not found." });
    }

    const purchaseOrder = purchaseOrders[0];
    response.json({ purchaseOrder });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get purchase order. Please try again.",
    });
  }
};
