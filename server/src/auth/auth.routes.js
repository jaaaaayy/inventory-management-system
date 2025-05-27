import { Router } from "express";
import { checkSchema } from "express-validator";
import { isAuthenticated, validate } from "../utils/middlewares.js";
import * as authController from "./auth.controller.js";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  checkSchema(registerValidationSchema),
  validate(),
  authController.register
);

router.post(
  "/login",
  checkSchema(loginValidationSchema),
  validate(),
  authController.login
);

router.get("/status", authController.authStatus);

router.post("/logout", isAuthenticated, authController.logout);

export default router;
