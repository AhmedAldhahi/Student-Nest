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
import { PaymentController } from "../../controllers/Landlord/PaymentMangement.controller";
import { PaymentManagementRouter } from "./paymentMangement.routes";

export const SharedIndexRouter = (
  apartmentController: ApartmentManagementController,
  leaseRequestManagementController: LeaseRequestManagementController,
  leaseManagementController: LeaseManagementController,
  notificationController: NotificationController,
  paymentController: PaymentController
): Router => {
  const router = Router();

  router.use("/apartments", isAuth, ApartmentSharedRouter(apartmentController));

  //todo: need to implement landlord-student for strategy
  router.use(
    "/leases-request",
    isAuth,
    LeaseRequestManagementRouter(leaseRequestManagementController)
  );

  //todo: need to implement landlord-student for strategy
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

  router.use("/payments", isAuth, PaymentManagementRouter(paymentController));

  return router;
};
