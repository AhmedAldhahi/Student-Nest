import { Router } from "express";
import { ApartmentManagementController } from "../controllers/admin/apartmentMangement.controller";
import { isAuth } from "../middlewares/auth/isAuth.middleware";

export const ApartmentSharedRouter = (
  apartmentController: ApartmentManagementController
): Router => {
  const router = Router();

  router.get("/apartments", isAuth, apartmentController.getAllApartments);
  return router;
};
