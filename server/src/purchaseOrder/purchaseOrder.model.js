import mongoose from "mongoose";

const PurchaseOrderSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    expectedDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Received", "Cancelled"],
      default: "Pending",
    },
    totalAmount: {
      type: mongoose.Schema.Types.Decimal128,
      default: null,
    },
  },
  { timestamps: true }
);

const PurchaseOrder = mongoose.model(
  "PurchaseOrder",
  PurchaseOrderSchema,
  "purchaseorders"
);
export default PurchaseOrder;
