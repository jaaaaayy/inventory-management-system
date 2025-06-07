import { Router } from "express";
import { checkSchema } from "express-validator";
import vendorValidationSchema from "./vendor.validation.js";
import {
  validate,
  isAuthenticated,
  checkPermissions,
} from "../utils/middlewares.js";
import * as vendorController from "./vendor.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  vendorController.getVendors
);

router.get(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  vendorController.getVendorById
);

router.post(
  "/",
  isAuthenticated,
  checkPermissions(["User"]),
  checkSchema(vendorValidationSchema),
  validate(),
  vendorController.createVendor
);

router.patch(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  vendorController.updateVendor
);

router.delete(
  "/:id",
  isAuthenticated,
  checkPermissions(["User"]),
  vendorController.deleteVendor
);

export default router;
