import Category from "./category.model.js";
import mongoose from "mongoose";

export const getCategories = async (request, response) => {
  try {
    const categories = await Category.find({
      user: request.session.user.id,
    }).sort({
      createdAt: -1,
    });

    response.json({ categories });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get categories. Please try again.",
    });
  }
};

export const getCategoryById = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid category id.",
      });
    }

    const findCategory = await Category.findById(id);

    if (!findCategory) {
      return response.status(404).json({ message: "Category not found." });
    }

    response.json({ category: findCategory });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get category. Please try again.",
    });
  }
};

export const createCategory = async (request, response) => {
  const { name, description } = request.body;

  try {
    const newCategory = new Category({
      name,
      description,
      user: request.session.user.id,
    });
    await newCategory.save();

    response.status(201).json({
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to create category. Please try again.",
    });
  }
};

export const updateCategory = async (request, response) => {
  const {
    params: { id },
    body,
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid category id.",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return response.status(404).json({ message: "Category not found." });
    }

    response.json({
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to update category. Please try again.",
    });
  }
};

export const deleteCategory = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid category id.",
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return response.status(404).json({ message: "Category not found." });
    }

    response.json({ message: "Category deleted successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to delete category. Please try again.",
    });
  }
};
