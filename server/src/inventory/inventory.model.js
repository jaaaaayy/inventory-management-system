import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    product: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      required: true,
      type: Number,
    },
    reservedQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastStockUpdate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

inventorySchema.index({ organization: 1, product: 1 }, { unique: true });

const Inventory = mongoose.model("inventory", inventorySchema);

export default Inventory;
