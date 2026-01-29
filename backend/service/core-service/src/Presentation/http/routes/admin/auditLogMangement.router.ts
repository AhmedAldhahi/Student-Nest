import { Router } from "express";
import { AuditLogController } from "../../controllers/Adminstration/auditLogManagement.controller";
import { getAllAuditLogsRateLimit } from "../../middlewares/rate-limited/Adminstration/GetAllAuditLogRateLimit.middleware";
import { searchAuditLogsRateLimit } from "../../middlewares/rate-limited/Adminstration/SearchForAuditLogRateLimit.middleware";

export const AuditLogRouter = (
  auditLogController: AuditLogController,
): Router => {
  const router = Router();

  router.get("/", getAllAuditLogsRateLimit, auditLogController.GetAllAuditLog);

  router.get("/search", searchAuditLogsRateLimit,auditLogController.GetAuditLogQuery);

  return router;
};
