import { Router } from "express";
import { isAdminOrLandlord } from "../../middlewares/auth/isAdminOrLandlord.middleware";
import { SharedApartmentManagementController } from "../../controllers/Apartment/ApartmentControllerShared";

export const ApartmentSharedRouter = (
  apartmentController: SharedApartmentManagementController
): Router => {
  const router = Router();

  router.get("/", apartmentController.getAllApartments);

  router.get("/search", apartmentController.getApartmentsByQueries);

  router.get("/:id/documents", apartmentController.FindApartmentDocumentById);

  router.get("/:id", apartmentController.getApartmentDetailById);

  router.delete(
    "/:apartmentId",
    isAdminOrLandlord,
    apartmentController.DeleteApartmentById
  );

  return router;
};
