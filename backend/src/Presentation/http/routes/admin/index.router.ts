import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
import { ApartmentRouter } from "./apartmentMangement.router";
import { AuditLogRouter } from "./auditLogMangement.router";
import { LeaseManagementRouter } from "./leaseMangement.router";
import { LeaseRequestManagementRouter } from "./leaseRequestMangement.router";
import { AuditLogController } from "../../controllers/admin/auditLogManagement.controller";
import { LeaseManagementController } from "../../controllers/admin/leaseManagement.controller";
import { LeaseRequestManagementController } from "../../controllers/admin/leaseRequestManagement.controller";
import { UserManagementController } from "../../controllers/admin/userManagement.controller";
import { userManagementRouter } from "./userMangement.routes";

export const AdminIndexRouter = (
  apartmentController: ApartmentManagementController,
  auditLogController: AuditLogController,
  leaseManagementController: LeaseManagementController,
  leaseRequestManagementController: LeaseRequestManagementController,
  userManagementController: UserManagementController
): Router => {
  const router = Router();

  // admin section
  router.use(ApartmentRouter(apartmentController));
  router.use(AuditLogRouter(auditLogController));
  router.use(LeaseManagementRouter(leaseManagementController));
  router.use(LeaseRequestManagementRouter(leaseRequestManagementController));
  router.use(userManagementRouter(userManagementController));

  return router;
};
