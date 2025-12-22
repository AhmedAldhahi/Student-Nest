import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";

export const ApartmentRouter = (
  apartmentController: ApartmentManagementController
): Router => {
  const router = Router();

  router.get(
    "/apartments",
    isAuth,
    isAdmin,
    apartmentController.getAllApartments
  );

  return router;
};
