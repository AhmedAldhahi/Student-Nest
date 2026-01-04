import { Router } from "express";
import { ApartmentController } from "../../controllers/Landlord/ApartmentMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import multer from "multer";
import {
  createApartmentSchema,
  UpdateApartmentSchema,
} from "../../validation/Landlord/apartment.validation.zod";
import { validationMedia } from "../../middlewares/validation.media.middleware.zod";
import uploads from "../../../../Shared/utils/uploader.multer";

const upload = multer({ storage: multer.memoryStorage() });

const apartmentUploads = upload.fields([
  { name: "apartmentPhoto", maxCount: 6 }, // Multiple photos
]);

export const ApartmentRouter = (
  apartmentController: ApartmentController
): Router => {
  const router = Router();

  router.post(
    "/",
    isAuth,
    isLandlord,
    apartmentUploads,
    validationMedia(createApartmentSchema),
    apartmentController.createApartment
  );

  router.post(
    "/:apartmentId/document",
    isAuth,
    isLandlord,
    uploads.single("apartmentDocument"),
    apartmentController.addApartmentDocumentForApartment
  );

  router.patch(
    "/:apartmentId/documents",
    isAuth,
    isLandlord,
    uploads.single("apartmentDocument"),
    apartmentController.updateApartmentDocuments
  );

  router.patch(
    "/:id",
    isAuth,
    isLandlord,
    uploads.array("apartmentPhoto", 6),
    validationMedia(UpdateApartmentSchema),
    apartmentController.UpdateApartmentDetailsById
  );

  return router;
};
