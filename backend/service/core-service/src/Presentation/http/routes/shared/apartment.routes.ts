import { Router } from "express";
import { isAdminOrLandlord } from "../../middlewares/auth/isAdminOrLandlord.middleware";
import { SharedApartmentManagementController } from "../../controllers/Apartment/ApartmentControllerShared";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { authenticatedSearchRateLimit } from "../../middlewares/rate-limited/Apartment/authenticateSearchRateLimit.middleware";
import { deleteApartmentRateLimit } from "../../middlewares/rate-limited/Apartment/deleteApartmentRateLimit.middleware";
import { generalReadRateLimit } from "../../middlewares/rate-limited/Apartment/GeneralRateLimit.middleware";
import { publicReadRateLimit } from "../../middlewares/rate-limited/Apartment/publicReadRateLimit.middleware";

export const ApartmentSharedRouter = (
  apartmentController: SharedApartmentManagementController,
): Router => {
  const router = Router();

  router.get(
    "/",
    generalReadRateLimit,
    isAuth,
    apartmentController.getAllApartments,
  );

  router.get(
    "/search",
    authenticatedSearchRateLimit,
    isAuth,
    apartmentController.getApartmentsByQueries,
  );

  router.get(
    "/:id/documents",
    generalReadRateLimit,
    isAuth,
    apartmentController.FindApartmentDocumentById,
  );

  router.get(
    "/:id",
    generalReadRateLimit,
    isAuth,
    apartmentController.getApartmentDetailById,
  );

  router.delete(
    "/:apartmentId",
    deleteApartmentRateLimit,
    isAuth,
    isAdminOrLandlord,
    apartmentController.DeleteApartmentById,
  );

  router.get(
    "/detail/:id",
    publicReadRateLimit,
    apartmentController.getApartmentDetailForGuest,
  );

  router.get(
    "/search/filter",
    publicReadRateLimit,
    apartmentController.getFilterApartment,
  );

  return router;
};
