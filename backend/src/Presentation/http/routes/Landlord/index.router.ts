import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentController } from "../../controllers/Landlord/ApartmentMangement.controller";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { ApartmentRouter } from "./apartmentMangement.router";

export const LandlordIndexRouter = (
  apartmentController: ApartmentController
): Router => {
  const router = Router();

  // admin section

  router.use(
    "/apartments",
    isAuth,
    isLandlord,
    ApartmentRouter(apartmentController)
  );

  return router;
};
