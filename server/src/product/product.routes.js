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

router.post(
  "/",
  isAuthenticated,
  checkPermissions(["User"]),
  upload.single("image"),
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
