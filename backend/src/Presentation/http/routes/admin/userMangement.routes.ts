import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { verifiedLandlordSchema } from "../../validation/admin/landlordMagement.validation.zod";
import { UserManagementController } from "../../controllers/admin/userManagement.controller";

export const userManagementRouter = (
  userManagementRouter: UserManagementController
): Router => {
  const router = Router();


  router.patch(
    "/landlords/verification/:landlordId",
    validation(verifiedLandlordSchema),
    isAuth,
    isAdmin,
    userManagementRouter.updateLandlordVerifiedStatus
  );

  router.get(
    "/users/:userRole",
    isAuth,
    isAdmin,
    userManagementRouter.getAllUsers
  );

  router.delete(
    "/users/:userId",
    isAuth,
    isAdmin,
    userManagementRouter.deleteLandlordById
  );

  router.get(
    "/users/:userRole/search",
    isAuth,
    isAdmin,
    userManagementRouter.findUsersByQuery
  );

  //todo: need to add validation zod middleware
  router.patch(
    "/users/:id/status",
    isAuth,
    isAdmin,
    userManagementRouter.updateActivateStatus
  );

  return router;
};
