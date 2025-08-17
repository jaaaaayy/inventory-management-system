import Customer from "../customer/customer.model.js";
import Inventory from "../inventory/inventory.model.js";
import Product from "../product/product.model.js";
import SalesItem from "../salesItem/salesItem.model.js";
import SalesOrder from "./salesOrder.model.js";
import mongoose from "mongoose";

export const createSalesOrder = async (request, response) => {
  try {
    const { customer, orderDate, deliveryDate, items } = request.body;

    const findCustomer = await Customer.findById(customer);

    if (!findCustomer) {
      return response.status(400).send({ message: "Customer not found." });
    }

    const newSalesItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const findInventory = await Inventory.findOne({ product: item.product });

      if (!findInventory || findInventory.quantity < item.quantity) {
        return response.status(400).send({
          message: `Insufficient stock for product ${item.product}. Available quantity: ${findInventory.quantity}.`,
        });
      }

      const findProduct = await Product.findById(item.product);
      const totalPrice = findProduct.sellingPrice * item.quantity;
      totalAmount += totalPrice;

      newSalesItems.push({
        salesOrder: null,
        product: item.product,
        quantity: item.quantity,
        totalPrice,
      });

      findInventory.quantity -= item.quantity;
      await findInventory.save();
    }

    const newSalesOrder = new SalesOrder({
      customer,
      orderDate,
      deliveryDate,
      totalAmount,
    });
    await newSalesOrder.save();

    for (const item of newSalesItems) {
      item.salesOrder = newSalesOrder._id;
    }

    await SalesItem.insertMany(newSalesItems);

    response.status(201).send({
      message: "Sales order created successfully.",
      salesOrder: newSalesOrder,
      salesItems: newSalesItems,
    });
  } catch (error) {
    console.log(error.message);
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
                    "$productDetails.image",
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
