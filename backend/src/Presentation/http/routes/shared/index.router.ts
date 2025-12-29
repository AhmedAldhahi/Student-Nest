import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentSharedRouter } from "./apartment.routes";
import { LeaseRequestManagementController } from "../../controllers/admin/leaseRequestManagement.controller";
import { LeaseRequestManagementRouter } from "./leaseRequestMangement.router";
import { LeaseManagementController } from "../../controllers/admin/leaseManagement.controller";
import { LeaseManagementRouter } from "./leaseMangement.router";
import { NotificationController } from "../../controllers/Notification.controller";
import { notificationRouter } from "./notifcationMangement.routes";

export const SharedIndexRouter = (
  apartmentController: ApartmentManagementController,
  leaseRequestManagementController: LeaseRequestManagementController,
  leaseManagementController: LeaseManagementController,
  notificationController: NotificationController
): Router => {
  const router = Router();

  router.use("/apartments", isAuth, ApartmentSharedRouter(apartmentController));

  //TODO: need to add strategy pattern, and is student or admin
  router.use(
    "/lease-request",
    isAuth,
    LeaseRequestManagementRouter(leaseRequestManagementController)
  );

  //TODO: need to add strategy pattern and  is landlord or student or admin and factory
  router.use(
    "/leases",
    isAuth,
    LeaseManagementRouter(leaseManagementController)
  );

  
  router.use(
    "/notifications",
    isAuth,
    notificationRouter(notificationController)
  );

  return router;
};
