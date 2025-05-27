import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      maxlength: 100,
      trim: true,
    },
    stockKeepingUnit: {
      required: true,
      type: String,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    costPrice: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    sellingPrice: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    unit: {
      required: true,
      type: String,
      trim: true,
    },
    imageUrl: {
      required: true,
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
