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
  categoryController.getCategories
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
  checkPermissions(["User"]),
  checkSchema(categoryValidationSchema),
  validate(),
  categoryController.createCategory
);

router.patch(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  categoryController.deleteCategory
);

export default router;
