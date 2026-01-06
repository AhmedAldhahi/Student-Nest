import { Router } from "express";
import { LeastRequestController } from "../../controllers/Landlord/LeastRequestMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { UpdateLeaseRequestStatusSchema } from "../../validation/Landlord/leaseRequest.valdation.zod";

export const LeastRequestRouter = (
  leastRequestController: LeastRequestController
): Router => {
  const router = Router();

  router.patch(
    "/:leastRequestId/status",
    isAuth,
    isLandlord,
    validation(UpdateLeaseRequestStatusSchema),
    leastRequestController.UpdateLeastRequestStatus
  );

  return router;
};
