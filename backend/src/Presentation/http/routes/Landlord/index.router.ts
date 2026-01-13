import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentController } from "../../controllers/Landlord/ApartmentMangement.controller";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { ApartmentRouter } from "./apartmentMangement.router";
import { LeaseManagement } from "../../controllers/Landlord/LeaseMangement.controller";
import { LeaseRouter } from "./leaseMangement.router";
import { LeastRequestController } from "../../controllers/Landlord/LeastRequestMangement.controller";
import { LeastRequestRouter } from "./leastRequestMangement.router";
import { PaymentRouter } from "./paymentMangement.router";
import { PaymentController } from "../../controllers/Landlord/PaymentMangement.controller";

export const LandlordIndexRouter = (
  apartmentController: ApartmentController,
  leaseController: LeaseManagement,
  leastRequestController: LeastRequestController,
  paymentController: PaymentController
): Router => {
  const router = Router();

  router.use(
    "/apartments",
    isAuth,
    isLandlord,
    ApartmentRouter(apartmentController)
  );

  router.use("/leases", isAuth, isLandlord, LeaseRouter(leaseController));

  router.use("/leases-request", LeastRequestRouter(leastRequestController));

  router.use("/payment",  PaymentRouter(paymentController));

  return router;
};
