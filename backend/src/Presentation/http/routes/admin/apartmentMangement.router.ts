import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
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

  router.get(
    "/apartments/search",
    isAuth,
    isAdmin,
    apartmentController.getApartmentsByQueries
  );

  router.patch(
    "/apartment/:apartmentId/verify",
    isAuth,
    isAdmin,
    apartmentController.updateApartmentVerificationStatus
  );

  router.delete(
    "/apartment/:apartmentId",
    isAuth,
    isAdmin,
    apartmentController.DeleteApartmentById
  );

  router.get(
    "/apartment-document/:id",
    isAuth,
    isAdmin,
    apartmentController.FindApartmentDocumentById
  );

  router.get(
    "/apartment/:id",
    isAuth,
    isAdmin,
    apartmentController.getApartmentDetailById
  );

  router.patch(
    "/apartment/:id",
    isAuth,
    isAdmin,
    apartmentController.UpdateApartmentDetailsById
  );

  router.patch(
    "/apartment-document/:id", // <--- Added Slash
    isAuth,
    isAdmin,
    apartmentController.updateApartmentDocuments
  );

  return router;
};
