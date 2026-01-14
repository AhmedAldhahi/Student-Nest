import { Router } from "express";
import { SharedLeaseRequestController } from "../../controllers/LeaseRequest/SharedleaseReques.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const LeaseRequestManagementRouter = (
  leaseRequestManagementController: SharedLeaseRequestController
): Router => {
  const router = Router();

  //TODO: shared between it and students and need strategy

  router.get("/", isAuth,leaseRequestManagementController.getAllLeaseRequest);

  //TODO: shared between it and students and need strategy
  router.get(
    "/search",isAuth,
    leaseRequestManagementController.getLeaseRequestByQuery
  );

  return router;
};
