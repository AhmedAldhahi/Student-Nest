import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { apartmentVerifiedZod } from "../../validation/admin/apartment.validation.zod";


export const ApartmentRouter = (
  apartmentController: ApartmentManagementController,
  
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
    validation(apartmentVerifiedZod),
    apartmentController.updateApartmentVerificationStatus
  );

  // shared need strategy 
  router.delete(
    "/apartment/:apartmentId",
    isAuth,
    isAdmin,
    apartmentController.DeleteApartmentById
  );

  // shared 
  router.get(
    "/apartment-document/:id",
    isAuth,
    isAdmin,
    apartmentController.FindApartmentDocumentById
  );


  // shared
  router.get(
    "/apartment/:id",
    isAuth,
    isAdmin,
    apartmentController.getApartmentDetailById
  );
  

  //todo: will be removed and move to landlord
  router.patch(
    "/apartment/:id",
    isAuth,
    isAdmin,
    apartmentController.UpdateApartmentDetailsById
  );

  //todo will be remove and move to landlord
  router.patch(
    "/apartment-document/:id",
    isAuth,
    isAdmin,
    apartmentController.updateApartmentDocuments
  );

  return router;
};
