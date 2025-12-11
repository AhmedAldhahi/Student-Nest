import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { verifiedLandlordSchema } from "../../validation/admin/landlordMagement.validation.zod";
import { UserManagementController } from "../../controllers/admin/userMangement.controller";

export const userManagementRouter = (
  userManagementRouter: UserManagementController
): Router => {
  const router = Router();

  router.get(
    "/landlords",
    isAuth,
    isAdmin,
    userManagementRouter.getAllLandlords
  );

  router.get("/students", isAuth, isAdmin, userManagementRouter.getAllStudents);

  router.patch(
    "/landlords/verification/:landlordId",
    validation(verifiedLandlordSchema),
    isAuth,
    isAdmin,  
    userManagementRouter.updateLandlordVerifiedStatus
  );

  router.delete(
    "/landlord/:landlordId",
    isAuth,
    isAdmin,
    userManagementRouter.deleteLandlordById
  );

  router.get(
    "/users/search/:email",
    isAuth,
    isAdmin,
    userManagementRouter.findUsersByEmail
  );

  return router;
};
