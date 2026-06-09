import mongoose from "mongoose";

const PurchaseItemSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    receivedQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    unitPrice: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    totalPrice: {
      type: mongoose.Schema.Types.Decimal128,
      default: null,
    },
  },
  { timestamps: true }
);

const PurchaseItem = mongoose.model(
  "PurchaseItem",
  PurchaseItemSchema,
  "purchaseitems"
);
export default PurchaseItem;
