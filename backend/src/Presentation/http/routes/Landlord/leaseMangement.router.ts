import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { LeaseManagement } from "../../controllers/Landlord/LeaseMangement.controller";

export const LeaseRouter = (LeastController: LeaseManagement): Router => {
  const router = Router();

  router.get(
    "/:apartmentId",
    isAuth,
    isLandlord,
    LeastController.getAllLeaseForSingleApartment
  );

  router.get(
    "/:apartmentId/search",
    isAuth,
    isLandlord,
    LeastController.SearchAllLeasesForSingleApartment
  );

  return router;
};
