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
import { SettingController } from "../../controllers/Shared/Setting.controller";
import { SettingRouter } from "./setting.routes";
import { globalSharedRateLimit } from "../../middlewares/rate-limited/GlobalRateLimit/GlobalSharedRateLimit.middleware";

export const SharedIndexRouter = (
  apartmentController: SharedApartmentManagementController,
  leaseRequestManagementController: SharedLeaseRequestController,
  leaseManagementController: SharedLeaseManagementController,
  notificationController: NotificationController,
  paymentController: SharedPaymentController,
  settingController: SettingController,
): Router => {
  const router = Router();

  router.use(globalSharedRateLimit)

  router.use("/apartments", ApartmentSharedRouter(apartmentController));

  router.use(
    "/leases-request",
    LeaseRequestManagementRouter(leaseRequestManagementController),
  );

  router.use("/leases", LeaseManagementRouter(leaseManagementController));

  router.use("/notifications", notificationRouter(notificationController));

  router.use("/payments", PaymentManagementRouter(paymentController));

  router.use("/setting", SettingRouter(settingController));

  return router;
};
