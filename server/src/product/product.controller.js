import Inventory from "../inventory/inventory.model.js";
import Category from "../category/category.model.js";
import Product from "./product.model.js";
import Vendor from "../vendor/vendor.model.js";
import { withTransaction } from "../config/database.js";
import mongoose from "mongoose";
import SalesItem from "../salesItem/salesItem.model.js";
import {
  deleteProductImage,
  uploadProductImage,
} from "../services/storage.service.js";

export const createProduct = async (request, response) => {
  try {
    const {
      name,
      stockKeepingUnit,
      costPrice,
      sellingPrice,
      unit,
      category,
      quantity,
      vendor,
    } = request.body;
    const errors = {};

    if (costPrice <= 0) {
      errors.costPrice = "Cost price must be a positive number.";
    }

    if (sellingPrice <= 0) {
      errors.sellingPrice = "Selling price must be a positive number.";
    }

    const findStockKeepingUnit = await Product.findOne({
      organization: request.organizationId,
      stockKeepingUnit,
    });

    if (findStockKeepingUnit) {
      errors.stockKeepingUnit = "SKU is already in use.";
    }

    const findCategory = await Category.findOne({
      _id: category,
      organization: request.organizationId,
    });
    if (!findCategory) {
      errors.category = "Category not found.";
    }

    const findVendor = await Vendor.findOne({
      _id: vendor,
      organization: request.organizationId,
    });
    if (!findVendor) {
      errors.vendor = "Vendor not found.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    let savedImageUrl;

    if (request.file) {
      savedImageUrl = await uploadProductImage(request.file);
    }

    const result = await withTransaction(async (session) => {
      const newProduct = new Product({
        organization: request.organizationId,
        name,
        stockKeepingUnit,
        costPrice,
        sellingPrice,
        unit,
        imageUrl: savedImageUrl,
        category,
        vendor,
      });
      await newProduct.save({ session });

      const newInventory = new Inventory({
        organization: request.organizationId,
        product: newProduct._id,
        quantity,
        lastStockUpdate: new Date(),
      });
      await newInventory.save({ session });

      return {
        product: newProduct,
        inventory: newInventory,
      };
    });

    return response.status(201).send({
      message: "Product created successfully.",
      product: result.product,
      inventory: result.inventory,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to create product. Please try again.",
    });
  }
};

export const getProducts = async (request, response) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          organization: request.organizationId,
        },
      },
      {
        $lookup: {
          from: "inventories",
          localField: "_id",
          foreignField: "product",
          as: "inventory",
        },
      },
      {
        $unwind: {
          path: "$inventory",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
        },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendor",
        },
      },
      {
        $unwind: {
          path: "$vendor",
        },
      },
      {
        $project: {
          _id: 1,
          organization: 1,
          name: 1,
          description: 1,
          stockKeepingUnit: 1,
          costPrice: { $toDouble: "$costPrice" },
          sellingPrice: { $toDouble: "$sellingPrice" },
          unit: 1,
          imageUrl: 1,
          category: "$category.name",
          vendor: "$vendor.name",
          quantity: "$inventory.quantity",
          lastStockUpdate: "$inventory.lastStockUpdate",
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]).sort({ createdAt: -1 });

    response.send({ products });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get all products. Please try again.",
    });
  }
};

export const updateProduct = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid product id.",
      });
    }

    const {
      name,
      stockKeepingUnit,
      costPrice,
      sellingPrice,
      unit,
      category,
      quantity,
      vendor,
    } = request.body;
    const errors = {};

    const existingProduct = await Product.findOne({
      _id: id,
      organization: request.organizationId,
    });
    if (!existingProduct) {
      return response.status(404).json({ message: "Product not found." });
    }

    if (costPrice <= 0) {
      errors.costPrice = "Cost price must be a positive number.";
    }

    if (sellingPrice <= 0) {
      errors.sellingPrice = "Selling price must be a positive number.";
    }

    const findStockKeepingUnit = await Product.findOne({
      organization: request.organizationId,
      stockKeepingUnit,
      _id: { $ne: id },
    });
    if (findStockKeepingUnit) {
      errors.stockKeepingUnit = "SKU is already in use.";
    }

    const findCategory = await Category.findOne({
      _id: category,
      organization: request.organizationId,
    });
    if (!findCategory) {
      errors.category = "Category not found.";
    }

    const findVendor = await Vendor.findOne({
      _id: vendor,
      organization: request.organizationId,
    });
    if (!findVendor) {
      errors.vendor = "Vendor not found.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    let imageUrl = existingProduct.imageUrl;
    let oldImageUrl;
    if (request.file) {
      imageUrl = await uploadProductImage(request.file);
      oldImageUrl = existingProduct.imageUrl;
    }

    const result = await withTransaction(async (session) => {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id, organization: request.organizationId },
        {
          name,
          stockKeepingUnit,
          costPrice,
          sellingPrice,
          unit,
          imageUrl,
          category,
          vendor,
        },
        { new: true, runValidators: true, session }
      );

      let updatedInventory;
      if (quantity !== undefined) {
        updatedInventory = await Inventory.findOneAndUpdate(
          { product: id, organization: request.organizationId },
          { quantity, lastStockUpdate: new Date() },
          { new: true, runValidators: true, session }
        );
      }

      return { product: updatedProduct, inventory: updatedInventory };
    });

    if (oldImageUrl) {
      await deleteProductImage(oldImageUrl).catch((error) =>
        console.log(`Failed to delete old product image: ${error.message}`)
      );
    }

    response.json({
      message: "Product updated successfully.",
      product: result.product,
      inventory: result.inventory,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to update product. Please try again.",
    });
  }
};

export const deleteProduct = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid product id.",
      });
    }

    const existingProduct = await Product.findOne({
      _id: id,
      organization: request.organizationId,
    });
    if (!existingProduct) {
      return response.status(404).json({ message: "Product not found." });
    }

    const salesItemCount = await SalesItem.countDocuments({
      product: id,
      organization: request.organizationId,
    });
    if (salesItemCount > 0) {
      return response.status(400).json({
        message:
          "Cannot delete a product that is referenced by existing sales orders.",
      });
    }

    await withTransaction(async (session) => {
      await Product.deleteOne({
        _id: id,
        organization: request.organizationId,
      }).session(session);

      await Inventory.deleteOne({
        product: id,
        organization: request.organizationId,
      }).session(session);
    });

    if (existingProduct.imageUrl) {
      await deleteProductImage(existingProduct.imageUrl).catch((error) =>
        console.log(`Failed to delete product image: ${error.message}`)
      );
    }

    response.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to delete product. Please try again.",
    });
  }
};

export const getProductById = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid product id.",
      });
    }

    const products = await Product.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(id),
          organization: request.organizationId,
        },
      },
      {
        $lookup: {
          from: "inventories",
          localField: "_id",
          foreignField: "product",
          as: "inventory",
        },
      },
      {
        $unwind: {
          path: "$inventory",
        },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendor",
        },
      },
      {
        $unwind: {
          path: "$vendor",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
        },
      },
      {
        $project: {
          _id: 1,
          organization: 1,
          name: 1,
          description: 1,
          stockKeepingUnit: 1,
          costPrice: { $toDouble: "$costPrice" },
          sellingPrice: { $toDouble: "$sellingPrice" },
          unit: 1,
          imageUrl: 1,
          category: "$category.name",
          categoryId: "$category._id",
          vendor: "$vendor.name",
          vendorId: "$vendor._id",
          quantity: "$inventory.quantity",
          lastStockUpdate: "$inventory.lastStockUpdate",
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    if (products.length === 0) {
      return response.status(404).json({ message: "Product not found." });
    }

    const product = products[0];

    response.json({ product });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get product. Please try again.",
    });
  }
};
