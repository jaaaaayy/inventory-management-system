import mongoose from "mongoose";

const SalesOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
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
    totalAmount: {
      type: mongoose.Schema.Types.Decimal128,
      default: null,
    },
  },
  { timestamps: true }
);

const SalesOrder = mongoose.model("salesorder", SalesOrderSchema);
export default SalesOrder;
