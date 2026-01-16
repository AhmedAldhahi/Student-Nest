import { Router } from "express";
import { isAdminOrLandlord } from "../../middlewares/auth/isAdminOrLandlord.middleware";
import { SharedApartmentManagementController } from "../../controllers/Apartment/ApartmentControllerShared";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const ApartmentSharedRouter = (
  apartmentController: SharedApartmentManagementController
): Router => {
  const router = Router();

  router.get("/", isAuth,apartmentController.getAllApartments);

  router.get("/search", isAuth, apartmentController.getApartmentsByQueries);

  router.get(
    "/:id/documents",
    isAuth,
    apartmentController.FindApartmentDocumentById
  );

  router.get("/:id", apartmentController.getApartmentDetailById);

  router.delete(
    "/:apartmentId",
    isAuth,
    isAdminOrLandlord,
    apartmentController.DeleteApartmentById
  );

  return router;
};
