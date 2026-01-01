import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
import { isAdminOrLandlord } from "../../middlewares/auth/isAdminOrLandlord.middleware";

export const ApartmentSharedRouter = (
  apartmentController: ApartmentManagementController
): Router => {
  const router = Router();


  router.get("/", apartmentController.getAllApartments);


  router.get("/search", apartmentController.getApartmentsByQueries);


  router.get("/:id/documents", apartmentController.FindApartmentDocumentById);

  

  //todo: need to make landlord part
  router.get("/:id", apartmentController.getApartmentDetailById);


  //todo: need to make landlord part
  router.delete(
    "/:apartmentId",
    isAdminOrLandlord,
    apartmentController.DeleteApartmentById
  );

  return router;
};
