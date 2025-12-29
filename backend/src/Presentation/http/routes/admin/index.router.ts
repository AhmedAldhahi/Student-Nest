import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
import { ApartmentRouter } from "./apartmentMangement.router";
import { AuditLogRouter } from "./auditLogMangement.router";
import { LeaseRequestManagementRouter } from "../shared/leaseRequestMangement.router";
import { AuditLogController } from "../../controllers/admin/auditLogManagement.controller";
import { LeaseRequestManagementController } from "../../controllers/admin/leaseRequestManagement.controller";
import { UserManagementController } from "../../controllers/admin/userManagement.controller";
import { userManagementRouter } from "./userMangement.routes";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const AdminIndexRouter = (
  apartmentController: ApartmentManagementController,
  auditLogController: AuditLogController,
  leaseRequestManagementController: LeaseRequestManagementController,
  userManagementController: UserManagementController
): Router => {
  const router = Router();

  // admin section

  router.use(
    "/apartments",
    isAuth,
    isAdmin,
    ApartmentRouter(apartmentController)
  );

  router.use("/audit-log", isAuth, isAdmin, AuditLogRouter(auditLogController));


  

  router.use(LeaseRequestManagementRouter(leaseRequestManagementController));

  router.use(userManagementRouter(userManagementController));

  return router;
};
