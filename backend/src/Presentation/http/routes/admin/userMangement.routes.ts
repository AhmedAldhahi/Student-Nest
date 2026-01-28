import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { verifiedLandlordSchema } from "../../validation/admin/landlordMagement.validation.zod";
import { UserManagementController } from "../../controllers/Adminstration/userManagement.controller";
import { verificationUserStatusSchema } from "../../validation/admin/userActivityValidation.zod";
import { userModificationRateLimit } from "../../middlewares/rate-limited/Adminstration/UserModifiedRateLimit.middleware";
import { userRetrievalRateLimit } from "../../middlewares/rate-limited/Adminstration/RetreiveAndSearchRateLimit.middleware";
import { userDeletionRateLimit } from "../../middlewares/rate-limited/Adminstration/UserDeleteRateLimit.middleware";

export const userManagementRouter = (
  userManagementRouter: UserManagementController
): Router => {
  const router = Router();


  router.patch(
    "/landlords/verification/:landlordId",
    userModificationRateLimit,
    validation(verifiedLandlordSchema),
    isAuth,
    isAdmin,
    userManagementRouter.updateLandlordVerifiedStatus
  );

  router.get(
    "/users/:userRole",
   // userRetrievalRateLimit,
    isAuth,
    isAdmin,
    userManagementRouter.getAllUsers
  );

  router.delete(
    "/users/:userId",
    userDeletionRateLimit,
    isAuth,
    isAdmin,
    userManagementRouter.deleteLandlordById
  );

  router.get(
    "/users/:userRole/search",
    userRetrievalRateLimit,
    isAuth,
    isAdmin,
    userManagementRouter.findUsersByQuery
  );

  router.patch(
    "/users/:id/status",
    userModificationRateLimit,
    isAuth,
    isAdmin,
    validation(verificationUserStatusSchema),
    userManagementRouter.updateActivateStatus
  );

  return router;
};
