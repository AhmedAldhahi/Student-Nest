import { Router } from "express";
import { ApartmentController } from "../../controllers/Landlord/ApartmentMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import multer from "multer";
import { createApartmentSchema } from "../../validation/Landlord/apartment.validation.zod";
import { validationMedia } from "../../middlewares/validation.media.middleware.zod";

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

  return router;
};
