import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentController } from "../../controllers/Landlord/ApartmentMangement.controller";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { ApartmentRouter } from "./apartmentMangement.router";
import { LeaseManagement } from "../../controllers/Landlord/LeaseMangement.controller";
import { LeaseRouter } from "./leaseMangement.router";

export const LandlordIndexRouter = (
  apartmentController: ApartmentController,
  leaseController: LeaseManagement
): Router => {
  const router = Router();


  router.use(
    "/apartments",
    isAuth,
    isLandlord,
    ApartmentRouter(apartmentController)
  );

  router.use("/leases", isAuth, isLandlord, LeaseRouter(leaseController));

  return router;
};
