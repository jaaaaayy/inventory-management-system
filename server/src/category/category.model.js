import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    description: {
      required: true,
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
