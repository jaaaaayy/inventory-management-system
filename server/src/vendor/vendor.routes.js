import { Router } from "express";
import { checkSchema } from "express-validator";
import vendorValidationSchema from "./vendor.validation.js";
import { validate, isAuthenticated } from "../utils/middlewares.js";
import * as vendorController from "./vendor.controller.js";

const router = Router();

router.get("/", isAuthenticated, vendorController.getVendors);

router.get("/:id", isAuthenticated, vendorController.getVendorById);

router.post(
  "/",
  isAuthenticated,
  checkSchema(vendorValidationSchema),
  validate(),
  vendorController.createVendor
);

router.patch("/:id", isAuthenticated, vendorController.updateVendor);

router.delete("/:id", isAuthenticated, vendorController.deleteVendor);

export default router;
