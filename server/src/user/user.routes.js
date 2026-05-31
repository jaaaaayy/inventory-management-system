import { Router } from "express";
import { isAuthenticated } from "../utils/middlewares.js";
import * as userController from "./user.controller.js";

const router = Router();

router.get("/", isAuthenticated, userController.getAllUsers);

router.get("/:id", isAuthenticated, userController.getUserById);

router.patch("/:id", isAuthenticated, userController.updateUserById);

router.delete("/:id", isAuthenticated, userController.deleteUserById);

export default router;
