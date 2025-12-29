import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
import { isAdminOrLandlord } from "../../middlewares/auth/isAdminOrLandlord.middleware";

export const ApartmentSharedRouter = (
  apartmentController: ApartmentManagementController
): Router => {
  const router = Router();

  //todo: need factory and strategy  for admin and landlord

  router.get("/:id/documents", apartmentController.FindApartmentDocumentById);

  //todo: need factory and strategy  for admin and landlord
  router.get("/:id", apartmentController.getApartmentDetailById);

  
  //todo: need to add factory and strategy
  router.get("/", apartmentController.getAllApartments);

  //todo: need to add factory and strategy

  router.get("/search", apartmentController.getApartmentsByQueries);

  //todo: need to make landlord part
  router.delete(
    "/:apartmentId",
    isAdminOrLandlord,
    apartmentController.DeleteApartmentById
  );

  return router;
};
