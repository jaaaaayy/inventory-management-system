import mongoose from "mongoose";

const SalesOrderSchema = new mongoose.Schema(
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
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
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
    deliveryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
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

SalesOrderSchema.index({ organization: 1, orderNumber: 1 }, { unique: true });

const SalesOrder = mongoose.model("SalesOrder", SalesOrderSchema, "salesorders");
export default SalesOrder;
