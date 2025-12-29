import { Router } from "express";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { LeaseRequestManagementController } from "../../controllers/admin/leaseRequestManagement.controller";

export const LeaseRequestManagementRouter = (
  leaseRequestManagementController: LeaseRequestManagementController
): Router => {
  const router = Router();

  //TODO: shared between it and students and need strategy

  router.get(
    "/",
    isAuth,
    isAdmin,
    leaseRequestManagementController.getAllLeaseRequest
  );


  //TODO: shared between it and students and need strategy
  router.get(
    "/search",
    isAuth,
    isAdmin,
    leaseRequestManagementController.getLeaseRequestByQuery
  );

  return router;
};
