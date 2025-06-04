import Category from "./category.model.js";
import mongoose from "mongoose";

export const getCategories = async (request, response) => {
  const userId = request.session.user.id;
  try {
    const categories = await Category.find({ user: userId }).sort({
      createdAt: -1,
    });

    response.json({ categories });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get all categories. Please try again.",
    });
  }
};

export const getCategoryById = async (request, response) => {
  try {
    const categoryId = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return response.status(400).json({
        message: "Invalid category id.",
      });
    }

    const findCategory = await Category.findById(categoryId);

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
  try {
    const { name, description } = request.body;

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
    console.log(error);
    response.status(500).json({
      message: "Failed to create category. Please try again.",
    });
  }
};

export const updateCategory = async (request, response) => {
  try {
    const {
      params: { id },
      body,
    } = request;

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
    console.log(error);
    response.status(500).json({
      message: "Failed to update category. Please try again.",
    });
  }
};

export const deleteCategory = async (request, response) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(request.params.id);

    if (!deletedCategory) {
      return response.status(404).json({ message: "Category not found." });
    }

    response.json({ message: "Category deleted successfully." });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to delete category. Please try again.",
    });
  }
};
