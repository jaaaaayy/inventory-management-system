import { Router } from "express";
import {
  validate,
  isAuthenticated,
  requirePermission,
} from "../utils/middlewares.js";
import categoryValidationSchema from "./category.validation.js";
import { checkSchema } from "express-validator";
import * as categoryController from "./category.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("category:read"),
  categoryController.getCategories
);

router.get(
  "/:id",
  isAuthenticated,
  requirePermission("category:read"),
  categoryController.getCategoryById
);

router.post(
  "/",
  isAuthenticated,
  requirePermission("category:create"),
  checkSchema(categoryValidationSchema),
  validate(),
  categoryController.createCategory
);

router.patch(
  "/:id",
  isAuthenticated,
  requirePermission("category:update"),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  isAuthenticated,
  requirePermission("category:delete"),
  categoryController.deleteCategory
);

export default router;
