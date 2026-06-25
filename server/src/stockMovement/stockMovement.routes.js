import { Router } from "express";
import { isAuthenticated, requirePermission } from "../utils/middlewares.js";
import * as stockMovementController from "./stockMovement.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("stockMovement:read"),
  stockMovementController.getStockMovements
);

router.get(
  "/:productId",
  isAuthenticated,
  requirePermission("stockMovement:read"),
  stockMovementController.getProductStockMovements
);

export default router;
