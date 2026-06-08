import mongoose from "mongoose";
import Inventory from "./inventory.model.js";
import Product from "../product/product.model.js";

export const adjustStock = async (request, response) => {
  const {
    params: { productId },
    body: { type, quantity },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return response.status(400).json({
        message: "Invalid product id.",
      });
    }

    const amount = Number(quantity);

    const product = await Product.findOne({
      _id: productId,
      organization: request.organizationId,
    });
    if (!product) {
      return response.status(404).json({ message: "Product not found." });
    }

    const inventory = await Inventory.findOne({
      product: productId,
      organization: request.organizationId,
    });
    if (!inventory) {
      return response
        .status(404)
        .json({ message: "Inventory record not found." });
    }

    let newQuantity;
    if (type === "increase") {
      newQuantity = inventory.quantity + amount;
    } else if (type === "decrease") {
      newQuantity = inventory.quantity - amount;
    } else {
      newQuantity = amount;
    }

    if (newQuantity < 0) {
      return response.status(400).json({
        message: `Insufficient stock for this adjustment. Available quantity: ${inventory.quantity}.`,
      });
    }

    inventory.quantity = newQuantity;
    inventory.lastStockUpdate = new Date();
    await inventory.save();

    response.json({
      message: "Stock adjusted successfully.",
      inventory,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to adjust stock. Please try again.",
    });
  }
};
