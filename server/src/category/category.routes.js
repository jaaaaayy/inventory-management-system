import { Router } from "express";
import { validate, isAuthenticated } from "../utils/middlewares.js";
import categoryValidationSchema from "./category.validation.js";
import { checkSchema } from "express-validator";
import * as categoryController from "./category.controller.js";

const router = Router();

router.get("/", isAuthenticated, categoryController.getCategories);

router.get("/:id", isAuthenticated, categoryController.getCategoryById);

router.post(
  "/",
  isAuthenticated,
  checkSchema(categoryValidationSchema),
  validate(),
  categoryController.createCategory
);

router.patch("/:id", isAuthenticated, categoryController.updateCategory);

router.delete("/:id", isAuthenticated, categoryController.deleteCategory);

export default router;
