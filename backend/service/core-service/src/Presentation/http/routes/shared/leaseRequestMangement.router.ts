import { Router } from "express";
import { SharedLeaseRequestController } from "../../controllers/LeaseRequest/SharedleaseReques.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { searchLeaseRequestsRateLimit } from "../../middlewares/rate-limited/LeaseRequest/publicSearchLeaseRequestRateLimit.middleware";
import { getAllLeaseRequestsRateLimit } from "../../middlewares/rate-limited/LeaseRequest/getAllLeaseRequestRateLimit.middleware";

export const LeaseRequestManagementRouter = (
  leaseRequestManagementController: SharedLeaseRequestController,
): Router => {
  const router = Router();

  router.get(
    "/",
    getAllLeaseRequestsRateLimit,
    isAuth,
    leaseRequestManagementController.getAllLeaseRequest,
  );

  router.get(
    "/search",
    searchLeaseRequestsRateLimit,
    isAuth,
    leaseRequestManagementController.getLeaseRequestByQuery,
  );

  return router;
};
