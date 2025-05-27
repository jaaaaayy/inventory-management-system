import { Router } from "express";
import {
  validate,
  isAuthenticated,
  checkPermissions,
} from "../utils/middlewares.js";
import categoryValidationSchema from "./category.validation.js";
import { checkSchema } from "express-validator";
import * as categoryController from "./category.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  categoryController.getAllCategories
);

router.get(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  categoryController.getCategoryById
);

router.post(
  "/",
  isAuthenticated,
  checkPermissions(["Admin"]),
  checkSchema(categoryValidationSchema),
  validate(),
  categoryController.createCategory
);

router.patch(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin"]),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin"]),
  categoryController.deleteCategory
);

export default router;
