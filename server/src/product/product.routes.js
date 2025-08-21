import { Router } from "express";
import { checkSchema } from "express-validator";
import upload from "../config/upload.js";
import inventoryValidationSchema from "../inventory/inventory.validation.js";
import {
  checkPermissions,
  isAuthenticated,
  validate,
} from "../utils/middlewares.js";
import * as productController from "./product.controller.js";
import productValidationSchema from "./product.validation.js";

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
  checkPermissions(["User"]),
  uploadImage,
  checkSchema(productValidationSchema),
  checkSchema(inventoryValidationSchema),
  validate(),
  productController.createProduct
);

router.get(
  "/",
  isAuthenticated,
  checkPermissions(["User"]),
  productController.getProducts
);

router.get(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  productController.getProductById
);

export default router;
