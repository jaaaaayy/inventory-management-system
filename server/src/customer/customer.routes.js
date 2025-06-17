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
  checkPermissions(["User"]),
  customerController.getCustomers
);

router.post(
  "/",
  isAuthenticated,
  checkPermissions(["User"]),
  checkSchema(customerValidationSchema),
  validate(),
  customerController.createCustomer
);

router.get(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  customerController.getCustomerById
);

router.patch(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  customerController.updateCustomer
);

router.delete(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  customerController.deleteCustomer
);

export default router;
