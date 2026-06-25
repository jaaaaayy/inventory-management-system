import { Router } from "express";
import authRouter from "./auth/auth.routes.js";
import memberRouter from "./organizationMember/organizationMember.routes.js";
import invitationRouter from "./invitation/invitation.routes.js";
import organizationRouter from "./organization/organization.routes.js";
import categoryRouter from "./category/category.routes.js";
import customerRouter from "./customer/customer.routes.js";
import productRouter from "./product/product.routes.js";
import vendorRouter from "./vendor/vendor.routes.js";
import salesOrderRouter from "./salesOrder/salesOrder.routes.js";
import inventoryRouter from "./inventory/inventory.routes.js";
import purchaseOrderRouter from "./purchaseOrder/purchaseOrder.routes.js";
import stockMovementRouter from "./stockMovement/stockMovement.routes.js";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/members", memberRouter);
router.use("/api/invitations", invitationRouter);
router.use("/api/organization", organizationRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/customers", customerRouter);
router.use("/api/products", productRouter);
router.use("/api/vendors", vendorRouter);
router.use("/api/sales/orders", salesOrderRouter);
router.use("/api/inventory", inventoryRouter);
router.use("/api/purchase/orders", purchaseOrderRouter);
router.use("/api/stock-movements", stockMovementRouter);

export default router;
