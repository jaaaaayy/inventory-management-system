import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  isAuthenticated,
  requirePermission,
  validate,
} from "../utils/middlewares.js";
import * as memberController from "./organizationMember.controller.js";
import { memberUpdateValidationSchema } from "./organizationMember.validation.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  requirePermission("member:read"),
  memberController.getMembers
);

router.patch(
  "/:id",
  isAuthenticated,
  requirePermission("member:updatePosition"),
  checkSchema(memberUpdateValidationSchema),
  validate(),
  memberController.updateMember
);

router.delete(
  "/:id",
  isAuthenticated,
  requirePermission("member:remove"),
  memberController.removeMember
);

export default router;
