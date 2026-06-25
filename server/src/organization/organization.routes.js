import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  isAuthenticated,
  requirePermission,
  validate,
} from "../utils/middlewares.js";
import * as organizationController from "./organization.controller.js";
import { organizationUpdateValidationSchema } from "./organization.validation.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("organization:read"),
  organizationController.getOrganization
);

router.patch(
  "/",
  isAuthenticated,
  requirePermission("organization:update"),
  checkSchema(organizationUpdateValidationSchema),
  validate(),
  organizationController.updateOrganization
);

export default router;
