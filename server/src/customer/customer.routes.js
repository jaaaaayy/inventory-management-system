import { Router } from "express";
import { isAuthenticated, validate } from "../utils/middlewares.js";
import customerValidationSchema from "./customer.validation.js";
import { checkSchema } from "express-validator";
import * as customerController from "./customer.controller.js";

const router = Router();

router.get("/", isAuthenticated, customerController.getCustomers);

router.post(
  "/",
  isAuthenticated,
  checkSchema(customerValidationSchema),
  validate(),
  customerController.createCustomer
);

router.get("/:id", isAuthenticated, customerController.getCustomerById);

router.patch("/:id", isAuthenticated, customerController.updateCustomer);

router.delete("/:id", isAuthenticated, customerController.deleteCustomer);

export default router;
