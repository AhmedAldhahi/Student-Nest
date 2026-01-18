import { Router } from "express";
import { SharedLeaseManagementController } from "../../controllers/Lease/SharedLease.controlller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const LeaseManagementRouter = (
  leaseManagementController: SharedLeaseManagementController
): Router => {
  const router = Router();

  router.get("/", isAuth, leaseManagementController.getAllLease);


  router.get("/search", isAuth, leaseManagementController.getLeaseByQuery);

  return router;
};
