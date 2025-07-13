import Customer from "../customer/customer.model.js";
import Inventory from "../inventory/inventory.model.js";
import Product from "../product/product.model.js";
import SalesItem from "../salesItem/salesItem.model.js";
import SalesOrder from "./salesOrder.model.js";

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
          as: "salesItems",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "salesItems.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          salesItems: {
            $map: {
              input: "$salesItems",
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
          totalAmount: 1,
          status: 1,
          salesItems: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    response.json(salesOrders);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get all sales orders. Please try again.",
    });
  }
};
