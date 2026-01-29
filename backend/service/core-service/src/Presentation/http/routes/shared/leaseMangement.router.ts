import { Router } from "express";
import { SharedLeaseManagementController } from "../../controllers/Lease/SharedLease.controlller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { getAllLeasesRateLimit } from "../../middlewares/rate-limited/Lease/getAllLeaseRateLimit.middleware";
import { searchLeasesRateLimit } from "../../middlewares/rate-limited/Lease/searchLeaseRateLimit.middleware";

export const LeaseManagementRouter = (
  leaseManagementController: SharedLeaseManagementController,
): Router => {
  const router = Router();

  router.get(
    "/",
    getAllLeasesRateLimit,
    isAuth,
    leaseManagementController.getAllLease,
  );

  router.get(
    "/search",
    searchLeasesRateLimit,
    isAuth,
    leaseManagementController.getLeaseByQuery,
  );

  return router;
};
