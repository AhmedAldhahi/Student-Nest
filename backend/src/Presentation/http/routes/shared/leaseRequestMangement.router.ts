import { Router } from "express";
import { LeaseRequestManagementController } from "../../controllers/admin/leaseRequestManagement.controller";

export const LeaseRequestManagementRouter = (
  leaseRequestManagementController: LeaseRequestManagementController
): Router => {
  const router = Router();

  //TODO: shared between it and students and need strategy

  router.get("/", leaseRequestManagementController.getAllLeaseRequest);

  //TODO: shared between it and students and need strategy
  router.get(
    "/search",
    leaseRequestManagementController.getLeaseRequestByQuery
  );

  return router;
};
