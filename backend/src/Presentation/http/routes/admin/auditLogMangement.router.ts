import { Router } from "express";
import { AuditLogController } from "../../controllers/admin/auditLogManagement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";

export const AuditLogRouter = (
  auditLogController: AuditLogController
): Router => {
  const router = Router();

  router.get("/audit-log", isAuth, isAdmin, auditLogController.GetAllAuditLog);

  return router;
};
