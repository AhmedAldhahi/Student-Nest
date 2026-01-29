import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { ApartmentRouter } from "./apartmentMangement.router";
import { LeaseRouter } from "./leaseMangement.router";
import { LeastRequestForLandlordController } from "../../controllers/LeaseRequest/LeastRequestForLandlord.controller";
import { LeastRequestRouter } from "./leastRequestMangement.router";
import { PaymentRouter } from "./paymentMangement.router";
import { PaymentForLandlordController } from "../../controllers/Payment/PaymentForLandlord.controller";
import { ApartmentControllerForLandlord } from "../../controllers/Apartment/ApartmentControllerForLandlord";
import { LeaseManagementForLandlord } from "../../controllers/Lease/LeaseForLandlord.controller";
import { globalLandlordRateLimit } from "../../middlewares/rate-limited/GlobalRateLimit/GlobalLandlordRateLimit.middleware";

export const LandlordIndexRouter = (
  apartmentController: ApartmentControllerForLandlord,
  leaseController: LeaseManagementForLandlord,
  leastRequestController: LeastRequestForLandlordController,
  paymentController: PaymentForLandlordController
): Router => {
  const router = Router();

  router.use(globalLandlordRateLimit)

  router.use(
    "/apartments",
    isAuth,
    isLandlord,
    ApartmentRouter(apartmentController)
  );

  router.use("/leases", isAuth, isLandlord, LeaseRouter(leaseController));

  router.use("/leases-request", LeastRequestRouter(leastRequestController));

  router.use("/payment", PaymentRouter(paymentController));

  return router;
};
