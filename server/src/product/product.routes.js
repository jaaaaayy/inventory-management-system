import { Router } from "express";
import { checkSchema } from "express-validator";
import upload from "../config/upload.js";
import inventoryValidationSchema from "../inventory/inventory.validation.js";
import {
  isAuthenticated,
  requirePermission,
  validate,
} from "../utils/middlewares.js";
import * as productController from "./product.controller.js";
import productValidationSchema, {
  productUpdateValidationSchema,
} from "./product.validation.js";

const router = Router();

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        req.fileValidationError =
          "Please upload a valid image file (JPG, PNG) under 5MB.";
        return next();
      }
      return next(err);
    }
    return next();
  });
};

router.post(
  "/",
  isAuthenticated,
  requirePermission("product:create"),
  uploadImage,
  checkSchema(productValidationSchema),
  checkSchema(inventoryValidationSchema),
  validate(),
  productController.createProduct
);

router.get(
  "/",
  isAuthenticated,
  requirePermission("product:read"),
  productController.getProducts
);

router.get(
  "/:id",
  isAuthenticated,
  requirePermission("product:read"),
  productController.getProductById
);

router.patch(
  "/:id",
  isAuthenticated,
  requirePermission("product:update"),
  uploadImage,
  checkSchema(productUpdateValidationSchema),
  checkSchema(inventoryValidationSchema),
  validate(),
  productController.updateProduct
);

router.delete(
  "/:id",
  isAuthenticated,
  requirePermission("product:delete"),
  productController.deleteProduct
);

export default router;
