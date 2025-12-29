import { Router } from "express";
import { AuditLogController } from "../../controllers/admin/auditLogManagement.controller";

export const AuditLogRouter = (
  auditLogController: AuditLogController
): Router => {
  const router = Router();

  router.get("/", auditLogController.GetAllAuditLog);

  router.get("/search", auditLogController.GetAuditLogQuery);

  return router;
};
