import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import multer from "multer";
import {
  createApartmentSchema,
  UpdateApartmentSchema,
} from "../../validation/Landlord/apartment.validation.zod";
import { validationMedia } from "../../middlewares/validation.media.middleware.zod";
import uploads from "../../../../Shared/utils/uploader.multer";
import { ApartmentControllerForLandlord } from "../../controllers/Apartment/ApartmentControllerForLandlord";
import { createApartmentRateLimit } from "../../middlewares/rate-limited/Apartment/createApartmentRateLimit.middleware";
import { getApartmentRateLimit } from "../../middlewares/rate-limited/Apartment/getApartmentRateLimit.middleware";
import { updateApartmentRateLimit } from "../../middlewares/rate-limited/Apartment/updateApartmentRateLimit.middleware";

const upload = multer({ storage: multer.memoryStorage() });

const apartmentUploads = upload.fields([
  { name: "apartmentPhoto", maxCount: 6 }, // Multiple photos
]);

export const ApartmentRouter = (
  apartmentController: ApartmentControllerForLandlord
): Router => {
  const router = Router();

  router.post(
    "/",
    createApartmentRateLimit,
    isAuth,
    isLandlord,
    apartmentUploads,
     validationMedia(createApartmentSchema),
    apartmentController.createApartment
  );

  router.post(
    "/:apartmentId/document",
    createApartmentRateLimit,
    isAuth,
    isLandlord,
    uploads.single("apartmentDocument"),
    apartmentController.addApartmentDocumentForApartment
  );

  router.patch(
    "/:apartmentId/documents",
    updateApartmentRateLimit,
    isAuth,
    isLandlord,
    uploads.single("apartmentDocument"),
    apartmentController.updateApartmentDocuments
  );

  router.patch(
    "/:id",
    updateApartmentRateLimit,
    isAuth,
    isLandlord,
    apartmentUploads,
    validationMedia(UpdateApartmentSchema),
    apartmentController.UpdateApartmentDetailsById
  );

  router.get(
    "/booked",
    getApartmentRateLimit,
    isAuth,
    isLandlord,
    apartmentController.GetBookedApartment
  );

  return router;
};
