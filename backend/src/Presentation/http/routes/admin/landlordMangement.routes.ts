import { Router } from "express";
import { LandloardManagementController } from "../../controllers/admin/landlordMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { verifiedLandlordSchema } from "../../validation/admin/landlordMagement.validation.zod";

export const landlordManagementRouter = (
  landlordManagementRouter: LandloardManagementController
): Router => {
  const router = Router();

  router.get(
    "/landlords",
    isAuth,
    isAdmin,
    landlordManagementRouter.getAllLandlords
  );

  router.patch(
    "/landlords/verification/:landlordId",
    validation(verifiedLandlordSchema),
    isAuth,
    isAdmin,
    landlordManagementRouter.updateLandlordVerifiedStatus
  );

  router.delete(
    "/landlord/:landlordId",
    isAuth,
    isAdmin,
    landlordManagementRouter.deleteLandlordById
  );

  return router;
};
