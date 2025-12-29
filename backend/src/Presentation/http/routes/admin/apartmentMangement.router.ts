import { Router } from "express";
import { ApartmentManagementController } from "../../controllers/admin/apartmentManagement.controller";
import { validation } from "../../middlewares/validation.middleware";
import { apartmentVerifiedZod } from "../../validation/admin/apartment.validation.zod";

export const ApartmentRouter = (
  apartmentController: ApartmentManagementController
): Router => {
  const router = Router();

  router.patch(
    "/:apartmentId/verify",
    validation(apartmentVerifiedZod),
    apartmentController.updateApartmentVerificationStatus
  );


  // //todo: will be removed and move to landlord
  // router.patch(
  //   "/:id",
  //   isAuth,
  //   isAdmin,
  //   apartmentController.UpdateApartmentDetailsById
  // );

  // //todo will be remove and move to landlord
  // router.patch(
  //   "/:id/documents",
  //   isAuth,
  //   isAdmin,
  //   apartmentController.updateApartmentDocuments
  // );

  return router;
};
