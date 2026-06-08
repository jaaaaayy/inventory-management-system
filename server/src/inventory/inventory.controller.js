import mongoose from "mongoose";
import Inventory from "./inventory.model.js";
import Product from "../product/product.model.js";
import { withTransaction } from "../config/database.js";
import { recordStockMovement } from "../stockMovement/stockMovement.service.js";

export const adjustStock = async (request, response) => {
  const {
    params: { productId },
    body: { type, quantity, reason },
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

    const delta = newQuantity - inventory.quantity;

    const updatedInventory = await withTransaction(async (session) => {
      inventory.quantity = newQuantity;
      inventory.lastStockUpdate = new Date();
      await inventory.save({ session });

      await recordStockMovement(session, {
        organization: request.organizationId,
        product: productId,
        type: "Adjustment",
        delta,
        quantityAfter: newQuantity,
        reason: reason || "",
        user: request.userId,
        referenceType: "Manual",
      });

      return inventory;
    });

    response.json({
      message: "Stock adjusted successfully.",
      inventory: updatedInventory,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to adjust stock. Please try again.",
    });
  }
};
