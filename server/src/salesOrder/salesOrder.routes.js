import { Router } from "express";
import {
  validate,
  isAuthenticated,
  requirePermission,
} from "../utils/middlewares.js";
import { checkSchema } from "express-validator";
import {
  salesOrderStatusValidationSchema,
  salesOrderValidationSchema,
} from "./salesOrder.validation.js";
import * as SalesOrderController from "./salesOrder.controller.js";
import { salesItemValidationSchema } from "../salesItem/salesItem.validation.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("salesOrder:read"),
  SalesOrderController.getAllSalesOrders
);

router.post(
  "/",
  isAuthenticated,
  requirePermission("salesOrder:create"),
  checkSchema(salesOrderValidationSchema),
  checkSchema(salesItemValidationSchema),
  validate(),
  SalesOrderController.createSalesOrder
);

router.get(
  "/:id",
  isAuthenticated,
  requirePermission("salesOrder:read"),
  SalesOrderController.getSalesOrder
);

router.patch(
  "/:id/status",
  isAuthenticated,
  requirePermission("salesOrder:updateStatus"),
  checkSchema(salesOrderStatusValidationSchema),
  validate(),
  SalesOrderController.updateSalesOrderStatus
);

export default router;
