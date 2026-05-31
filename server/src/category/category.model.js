import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    name: {
      required: true,
      type: String,
      maxlength: 50,
      trim: true,
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

categorySchema.index({ organization: 1, name: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
