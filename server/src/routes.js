import { Router } from "express";
import authRouter from "./auth/auth.routes.js";
import userRouter from "./user/user.routes.js";
import categoryRouter from "./category/category.routes.js";
import customerRouter from "./customer/customer.routes.js";
import productRouter from "./product/product.routes.js";
import vendorRouter from "./vendor/vendor.routes.js";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/customers", customerRouter);
router.use("/api/products", productRouter);
router.use("/api/vendors", vendorRouter);

export default router;
