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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
