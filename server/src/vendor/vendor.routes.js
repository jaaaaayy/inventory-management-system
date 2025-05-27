import { Router } from "express";
import { checkSchema } from "express-validator";
import vendorValidationSchema from "./vendor.validation.js";
import {
  validate,
  isAuthenticated,
  checkPermissions,
} from "../utils/middlewares.js";
import * as VendorController from "./vendor.controller.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  checkPermissions(["Admin", "Staff"]),
  checkSchema(vendorValidationSchema),
  validate(),
  VendorController.createVendor
);

router.get(
  "/",
  isAuthenticated,
  checkPermissions(["Admin", "Staff"]),
  VendorController.getAllVendors
);

export default router;
