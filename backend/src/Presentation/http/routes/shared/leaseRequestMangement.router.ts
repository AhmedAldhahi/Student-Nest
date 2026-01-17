import { Router } from "express";
import { SharedLeaseRequestController } from "../../controllers/LeaseRequest/SharedleaseReques.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const LeaseRequestManagementRouter = (
  leaseRequestManagementController: SharedLeaseRequestController
): Router => {
  const router = Router();


  router.get("/", isAuth,leaseRequestManagementController.getAllLeaseRequest);

  router.get(
    "/search",isAuth,
    leaseRequestManagementController.getLeaseRequestByQuery
  );

  return router;
};
