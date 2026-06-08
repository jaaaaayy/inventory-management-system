import { Router } from "express";
import { isAuthenticated } from "../utils/middlewares.js";
import * as stockMovementController from "./stockMovement.controller.js";

const router = Router();

router.get(
  "/:productId",
  isAuthenticated,
  stockMovementController.getProductStockMovements
);

export default router;
