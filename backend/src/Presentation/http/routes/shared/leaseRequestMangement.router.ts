import { Router } from "express";
import { SharedLeaseRequestController } from "../../controllers/LeaseRequest/SharedleaseReques.controller";

export const LeaseRequestManagementRouter = (
  leaseRequestManagementController: SharedLeaseRequestController
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
