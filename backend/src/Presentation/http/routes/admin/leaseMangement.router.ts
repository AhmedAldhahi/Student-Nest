import { Router } from "express";
import { LeaseManagementController } from "../../controllers/admin/leaseMangement.controller";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const LeaseManagementRouter = (
  leaseManagementController: LeaseManagementController
): Router => {
  const router = Router();

  router.get("/leases", isAuth, isAdmin, leaseManagementController.getAllLease);

  return router;
};
