import { Router } from "express";
import {
  validate,
  isAuthenticated,
  checkPermissions,
} from "../utils/middlewares.js";
import { checkSchema } from "express-validator";
import { salesOrderValidationSchema } from "./salesOrder.validation.js";
import * as SalesOrderController from "./salesOrder.controller.js";
import { salesItemValidationSchema } from "../salesItem/salesItem.validation.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  checkPermissions(["User"]),
  SalesOrderController.getAllSalesOrders
);

router.post(
  "/",
  isAuthenticated,
  checkPermissions(["User"]),
  checkSchema(salesOrderValidationSchema),
  checkSchema(salesItemValidationSchema),
  validate(),
  SalesOrderController.createSalesOrder
);

export default router;
