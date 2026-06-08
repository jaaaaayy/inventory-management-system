import { Router } from "express";
import { validate, isAuthenticated } from "../utils/middlewares.js";
import { checkSchema } from "express-validator";
import {
  purchaseOrderStatusValidationSchema,
  purchaseOrderValidationSchema,
} from "./purchaseOrder.validation.js";
import * as PurchaseOrderController from "./purchaseOrder.controller.js";
import { purchaseItemValidationSchema } from "../purchaseItem/purchaseItem.validation.js";

const router = Router();

router.get("/", isAuthenticated, PurchaseOrderController.getAllPurchaseOrders);

router.post(
  "/",
  isAuthenticated,
  checkSchema(purchaseOrderValidationSchema),
  checkSchema(purchaseItemValidationSchema),
  validate(),
  PurchaseOrderController.createPurchaseOrder
);

router.get("/:id", isAuthenticated, PurchaseOrderController.getPurchaseOrder);

router.patch(
  "/:id/status",
  isAuthenticated,
  checkSchema(purchaseOrderStatusValidationSchema),
  validate(),
  PurchaseOrderController.updatePurchaseOrderStatus
);

export default router;
