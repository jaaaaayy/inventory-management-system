import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      required: true,
      type: Number,
    },
    lastStockUpdate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("inventory", inventorySchema);

export default Inventory;
