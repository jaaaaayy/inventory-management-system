import { Router } from "express";
import { checkPermissions, isAuthenticated } from "../utils/middlewares.js";
import * as userController from "./user.controller.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  checkPermissions(["Admin"]),
  userController.getAllUsers
);

router.get(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  userController.getUserById
);

router.patch(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  userController.updateUserById
);

router.delete(
  "/:id",
  isAuthenticated,
  checkPermissions(["Admin", "User"]),
  userController.deleteUserById
);

export default router;
