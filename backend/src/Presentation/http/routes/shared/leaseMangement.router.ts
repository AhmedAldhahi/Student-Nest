import { Router } from "express";
import { SharedLeaseManagementController } from "../../controllers/Lease/SharedLease.controlller";

export const LeaseManagementRouter = (
  leaseManagementController: SharedLeaseManagementController
): Router => {
  const router = Router();

  //todo: need strategy and factory student-landlord-admin
  router.get("/", leaseManagementController.getAllLease);

  //todo: need strategy and factory student-landlord-admin

  router.get("/search", leaseManagementController.getLeaseByQuery);

  return router;
};
