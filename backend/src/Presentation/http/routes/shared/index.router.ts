import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentSharedRouter } from "./apartment.routes";
import { LeaseRequestManagementRouter } from "./leaseRequestMangement.router";
import { LeaseManagementRouter } from "./leaseMangement.router";
import { NotificationController } from "../../controllers/Shared/Notification.controller";
import { notificationRouter } from "./notifcationMangement.routes";
import { PaymentManagementRouter } from "./paymentMangement.routes";
import { SharedApartmentManagementController } from "../../controllers/Apartment/ApartmentControllerShared";
import { SharedLeaseRequestController } from "../../controllers/LeaseRequest/SharedleaseReques.controller";
import { SharedLeaseManagementController } from "../../controllers/Lease/SharedLease.controlller";
import { SharedPaymentController } from "../../controllers/Payment/SharedPayment.controller";

export const SharedIndexRouter = (
  apartmentController: SharedApartmentManagementController,
  leaseRequestManagementController: SharedLeaseRequestController,
  leaseManagementController: SharedLeaseManagementController,
  notificationController: NotificationController,
  paymentController: SharedPaymentController
): Router => {
  const router = Router();

  router.use("/apartments", isAuth, ApartmentSharedRouter(apartmentController));

  // //todo: need to implement landlord-student for strategy
  router.use(
    "/leases-request",
    isAuth,
    LeaseRequestManagementRouter(leaseRequestManagementController)
  );

  // //todo: need to implement landlord-student for strategy
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
