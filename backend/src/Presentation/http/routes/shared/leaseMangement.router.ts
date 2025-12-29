import { Router } from "express";
import { LeaseManagementController } from "../../controllers/admin/leaseManagement.controller";

export const LeaseManagementRouter = (
  leaseManagementController: LeaseManagementController
): Router => {
  const router = Router();

  //todo: need strategy and factory student-landlord-admin
  router.get("/", leaseManagementController.getAllLease);

  //todo: need strategy and factory student-landlord-admin

  router.get("/search", leaseManagementController.getLeaseByQuery);

  return router;
};
