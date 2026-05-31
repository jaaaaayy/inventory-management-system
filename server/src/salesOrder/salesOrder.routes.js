import { Router } from "express";
import { validate, isAuthenticated } from "../utils/middlewares.js";
import { checkSchema } from "express-validator";
import { salesOrderValidationSchema } from "./salesOrder.validation.js";
import * as SalesOrderController from "./salesOrder.controller.js";
import { salesItemValidationSchema } from "../salesItem/salesItem.validation.js";

const router = Router();

router.get("/", isAuthenticated, SalesOrderController.getAllSalesOrders);

router.post(
  "/",
  isAuthenticated,
  checkSchema(salesOrderValidationSchema),
  checkSchema(salesItemValidationSchema),
  validate(),
  SalesOrderController.createSalesOrder
);

router.get("/:id", isAuthenticated, SalesOrderController.getSalesOrder);

export default router;
