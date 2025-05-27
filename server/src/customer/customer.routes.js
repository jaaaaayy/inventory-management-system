import { Router } from "express";
import {
  checkPermissions,
  isAuthenticated,
  validate,
} from "../utils/middlewares.js";
import customerValidationSchema from "./customer.validation.js";
import { checkSchema } from "express-validator";
import * as customerController from "./customer.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  customerController.getAllCustomers
);

router.post(
  "/",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  checkSchema(customerValidationSchema),
  validate(),
  customerController.createCustomer
);

router.get(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  customerController.getCustomerById
);

router.patch(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin"]),
  customerController.updateCustomer
);

router.delete(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin"]),
  customerController.deleteCustomer
);

export default router;
