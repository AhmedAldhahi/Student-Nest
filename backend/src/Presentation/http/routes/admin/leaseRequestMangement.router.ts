import { Router } from "express";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { LeaseRequestManagementController } from "../../controllers/admin/leaseRequestManagement.controller";

export const LeaseRequestManagementRouter = (
  leaseRequestManagementController: LeaseRequestManagementController
): Router => {
  const router = Router();

  router.get(
    "/lease-requests",
    isAuth,
    isAdmin,
    leaseRequestManagementController.getAllLeaseRequest
  );

  router.get(
    "/lease-request/:leaseRequestId",
    isAuth,
    isAdmin,
    leaseRequestManagementController.getLeaseRequestById
  );

  return router;
};
