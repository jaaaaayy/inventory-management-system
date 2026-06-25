import { Router } from "express";
import { checkSchema } from "express-validator";
import vendorValidationSchema from "./vendor.validation.js";
import {
  validate,
  isAuthenticated,
  requirePermission,
} from "../utils/middlewares.js";
import * as vendorController from "./vendor.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("vendor:read"),
  vendorController.getVendors
);

router.get(
  "/:id",
  isAuthenticated,
  requirePermission("vendor:read"),
  vendorController.getVendorById
);

router.post(
  "/",
  isAuthenticated,
  requirePermission("vendor:create"),
  checkSchema(vendorValidationSchema),
  validate(),
  vendorController.createVendor
);

router.patch(
  "/:id",
  isAuthenticated,
  requirePermission("vendor:update"),
  vendorController.updateVendor
);

router.delete(
  "/:id",
  isAuthenticated,
  requirePermission("vendor:delete"),
  vendorController.deleteVendor
);

export default router;
