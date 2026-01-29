import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { LeaseManagementForLandlord } from "../../controllers/Lease/LeaseForLandlord.controller";
import { leaseRetrievalRateLimit } from "../../middlewares/rate-limited/Lease/RetreiveLeaseRateLimit.middleware";
import { searchLeasesRateLimit } from "../../middlewares/rate-limited/Lease/searchLeaseRateLimit.middleware";

export const LeaseRouter = (LeastController: LeaseManagementForLandlord): Router => {
  const router = Router();

  router.get(
    "/:apartmentId",
    leaseRetrievalRateLimit,
    isAuth,
    isLandlord,
    LeastController.getAllLeaseForSingleApartment
  );

  router.get(
    "/:apartmentId/search",
    searchLeasesRateLimit,
    isAuth,
    isLandlord,
    LeastController.SearchAllLeasesForSingleApartment
  );

  return router;
};
