import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
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
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
      default: "",
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
      maxlength: 10,
    },
    reorderPoint: {
      type: Number,
      min: 0,
      default: 10,
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

productSchema.index(
  { organization: 1, stockKeepingUnit: 1 },
  { unique: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
