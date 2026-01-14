import { Router } from "express";
import { ApartmentRouter } from "./apartmentMangement.router";
import { AuditLogRouter } from "./auditLogMangement.router";
import { AuditLogController } from "../../controllers/Adminstration/auditLogManagement.controller";
import { UserManagementController } from "../../controllers/Adminstration/userManagement.controller";
import { userManagementRouter } from "./userMangement.routes";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentManagementControllerForAdmin } from "../../controllers/Apartment/ApartmentControllerForAdmin";

export const AdminIndexRouter = (
  apartmentController: ApartmentManagementControllerForAdmin,
  auditLogController: AuditLogController,
  userManagementController: UserManagementController
): Router => {
  const router = Router();


  router.use(
    "/apartments",
    isAuth,
    isAdmin,
    ApartmentRouter(apartmentController)
  );

  router.use("/audit-log", isAuth, isAdmin, AuditLogRouter(auditLogController));

  router.use(userManagementRouter(userManagementController));

  return router;
};
