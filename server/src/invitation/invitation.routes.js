import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  isAuthenticated,
  requirePermission,
  validate,
} from "../utils/middlewares.js";
import { authLimiter } from "../utils/rateLimiters.js";
import * as invitationController from "./invitation.controller.js";
import {
  acceptInvitationValidationSchema,
  createInvitationValidationSchema,
} from "./invitation.validation.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  requirePermission("member:invite"),
  checkSchema(createInvitationValidationSchema),
  validate(),
  invitationController.createInvitation
);

router.get(
  "/",
  isAuthenticated,
  requirePermission("member:read"),
  invitationController.getInvitations
);

router.delete(
  "/:id",
  isAuthenticated,
  requirePermission("member:invite"),
  invitationController.revokeInvitation
);

router.get(
  "/accept/:token",
  authLimiter,
  invitationController.getInvitationByToken
);

router.post(
  "/accept/:token",
  authLimiter,
  checkSchema(acceptInvitationValidationSchema),
  validate(),
  invitationController.acceptInvitation
);

export default router;
