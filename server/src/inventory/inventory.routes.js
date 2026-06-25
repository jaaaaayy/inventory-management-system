import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  isAuthenticated,
  validate,
  requirePermission,
} from "../utils/middlewares.js";
import { inventoryAdjustValidationSchema } from "./inventory.validation.js";
import * as inventoryController from "./inventory.controller.js";

const router = Router();

router.patch(
  "/:productId/adjust",
  isAuthenticated,
  requirePermission("inventory:adjust"),
  checkSchema(inventoryAdjustValidationSchema),
  validate(),
  inventoryController.adjustStock
);

export default router;
