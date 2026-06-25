import { Router } from "express";
import {
  validate,
  isAuthenticated,
  requirePermission,
} from "../utils/middlewares.js";
import { checkSchema } from "express-validator";
import {
  purchaseOrderStatusValidationSchema,
  purchaseOrderValidationSchema,
} from "./purchaseOrder.validation.js";
import * as PurchaseOrderController from "./purchaseOrder.controller.js";
import { purchaseItemValidationSchema } from "../purchaseItem/purchaseItem.validation.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("purchaseOrder:read"),
  PurchaseOrderController.getAllPurchaseOrders
);

router.post(
  "/",
  isAuthenticated,
  requirePermission("purchaseOrder:create"),
  checkSchema(purchaseOrderValidationSchema),
  checkSchema(purchaseItemValidationSchema),
  validate(),
  PurchaseOrderController.createPurchaseOrder
);

router.get(
  "/:id",
  isAuthenticated,
  requirePermission("purchaseOrder:read"),
  PurchaseOrderController.getPurchaseOrder
);

router.patch(
  "/:id/status",
  isAuthenticated,
  requirePermission("purchaseOrder:updateStatus"),
  checkSchema(purchaseOrderStatusValidationSchema),
  validate(),
  PurchaseOrderController.updatePurchaseOrderStatus
);

export default router;
