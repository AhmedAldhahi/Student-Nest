import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { UpdateLeaseRequestStatusSchema } from "../../validation/Landlord/leaseRequest.valdation.zod";
import { LeaseRequestContext } from "../../../../Application/BoundedContexts/Shared/Strategy/leaseRequest/LeaseRequestContext";
import { LeastRequestForLandlordController } from "../../controllers/LeaseRequest/LeastRequestForLandlord.controller";

export const LeastRequestRouter = (
  leastRequestController: LeastRequestForLandlordController
): Router => {
  const router = Router();

  router.patch(
    "/:leastRequestId/status",
    isAuth,
    isLandlord,
    validation(UpdateLeaseRequestStatusSchema),
    leastRequestController.UpdateLeastRequestStatus
  );

  router.get(
    "/:apartmentId",
    isAuth,
    isLandlord,
    leastRequestController.getAllLeasesRequestForSingleApartment
  );

  router.get(
    "/:apartmentId/search",
    isAuth,
    isLandlord,
    leastRequestController.searchForLeasesRequestForSingleApartment
  );

  return router;
};
