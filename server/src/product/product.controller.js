import fs from "fs";
import path from "path";
import Inventory from "../inventory/inventory.model.js";
import Product from "./product.model.js";

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

    const findStockKeepingUnit = await Product.findOne({ stockKeepingUnit });

    if (findStockKeepingUnit) {
      errors.stockKeepingUnit = "SKU is already in use.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    let savedImagePath;

    if (request.file) {
      // Define the destination directory
      const uploadDir = "src/uploads";

      // Ensure the directory exists (optional, but good practice)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate the filename based on fieldname and current timestamp, with original file extension
      const filename =
        request.file.fieldname +
        "-" +
        Date.now() +
        path.extname(request.file.originalname);

      // Create the full path for the file
      const filePath = path.join(uploadDir, filename);

      // Save the file from memory to the disk
      fs.writeFileSync(filePath, request.file.buffer);

      // Store the file path (this can be saved to the database as the product's image path)
      savedImagePath = filename;
    }

    const newProduct = new Product({
      name,
      stockKeepingUnit,
      costPrice,
      sellingPrice,
      unit,
      image: savedImagePath,
      category,
      vendor,
    });
    await newProduct.save();

    const newInventory = new Inventory({
      product: newProduct._id,
      quantity,
    });
    await newInventory.save();

    return response.status(201).send({
      message: "Product created successfully.",
      product: newProduct,
      inventory: newInventory,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to create product. Please try again.",
    });
  }
};

export const getAllProducts = async (request, response) => {
  try {
    const products = await Product.aggregate([
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
          name: 1,
          description: 1,
          stockKeepingUnit: 1,
          costPrice: { $toDouble: "$costPrice" },
          sellingPrice: { $toDouble: "$sellingPrice" },
          unit: 1,
          image_url: 1,
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
    console.log(error);
    response.status(500).json({
      message: "Failed to get all products. Please try again.",
    });
  }
};
