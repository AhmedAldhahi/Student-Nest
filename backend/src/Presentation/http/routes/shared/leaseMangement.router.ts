import { Router } from "express";
import { SharedLeaseManagementController } from "../../controllers/Lease/SharedLease.controlller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const LeaseManagementRouter = (
  leaseManagementController: SharedLeaseManagementController
): Router => {
  const router = Router();

  //todo: need strategy and factory student-landlord-admin
  router.get("/", isAuth, leaseManagementController.getAllLease);

  //todo: need strategy and factory student-landlord-admin

  router.get("/search", isAuth, leaseManagementController.getLeaseByQuery);

  return router;
};
