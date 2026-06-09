import mongoose from "mongoose";

const PurchaseOrderSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      trim: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    expectedDate: {
      type: Date,
      required: true,
    },
    receivedDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Partially Received", "Received", "Cancelled"],
      default: "Pending",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    totalAmount: {
      type: mongoose.Schema.Types.Decimal128,
      default: null,
    },
  },
  { timestamps: true }
);

PurchaseOrderSchema.index(
  { organization: 1, orderNumber: 1 },
  { unique: true }
);

const PurchaseOrder = mongoose.model(
  "PurchaseOrder",
  PurchaseOrderSchema,
  "purchaseorders"
);
export default PurchaseOrder;
