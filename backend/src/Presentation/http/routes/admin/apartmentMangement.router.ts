import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware";
import { apartmentVerifiedZod } from "../../validation/admin/apartment.validation.zod";
import { ApartmentManagementControllerForAdmin } from "../../controllers/Apartment/ApartmentControllerForAdmin";

export const ApartmentRouter = (
  apartmentController: ApartmentManagementControllerForAdmin
): Router => {
  const router = Router();

  router.patch(
    "/:id/verify",
    validation(apartmentVerifiedZod),
    apartmentController.updateApartmentVerificationStatus
  );





  return router;
};
