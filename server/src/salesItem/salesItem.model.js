import mongoose from "mongoose";

const SalesItemSchema = new mongoose.Schema(
  {
    salesOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrder",
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
    totalPrice: {
      type: mongoose.Schema.Types.Decimal128,
      default: null,
    },
  },
  { timestamps: true }
);

const SalesItem = mongoose.model("salesitem", SalesItemSchema);
export default SalesItem;
