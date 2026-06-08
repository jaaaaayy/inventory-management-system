import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    type: {
      type: String,
      enum: ["Sale", "Sale Cancelled", "Purchase", "Adjustment"],
      required: true,
    },
    delta: {
      type: Number,
      required: true,
    },
    quantityAfter: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    referenceType: {
      type: String,
      enum: ["SalesOrder", "PurchaseOrder", "Manual"],
      default: "Manual",
    },
  },
  { timestamps: true }
);

StockMovementSchema.index({ organization: 1, product: 1, createdAt: -1 });

const StockMovement = mongoose.model(
  "StockMovement",
  StockMovementSchema,
  "stockmovements"
);
export default StockMovement;
