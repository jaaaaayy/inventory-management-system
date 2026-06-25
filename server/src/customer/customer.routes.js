import { Router } from "express";
import {
  isAuthenticated,
  validate,
  requirePermission,
} from "../utils/middlewares.js";
import customerValidationSchema from "./customer.validation.js";
import { checkSchema } from "express-validator";
import * as customerController from "./customer.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("customer:read"),
  customerController.getCustomers
);

router.post(
  "/",
  isAuthenticated,
  requirePermission("customer:create"),
  checkSchema(customerValidationSchema),
  validate(),
  customerController.createCustomer
);

router.get(
  "/:id",
  isAuthenticated,
  requirePermission("customer:read"),
  customerController.getCustomerById
);

router.patch(
  "/:id",
  isAuthenticated,
  requirePermission("customer:update"),
  customerController.updateCustomer
);

router.delete(
  "/:id",
  isAuthenticated,
  requirePermission("customer:delete"),
  customerController.deleteCustomer
);

export default router;
