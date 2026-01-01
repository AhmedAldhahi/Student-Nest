import { Router } from "express";
import { ApartmentController } from "../../controllers/Landlord/ApartmentMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import multer from "multer";
import { validate } from "uuid";
import { validation } from "../../middlewares/validation.middleware";
import { createApartmentSchema } from "../../validation/Landlord/apartment.validation.zod";

const upload = multer({ storage: multer.memoryStorage() });

const apartmentUploads = upload.fields([
  { name: "apartmentPhoto", maxCount: 6 }, // Multiple photos
  { name: "apartmentDocument", maxCount: 2 }, // Multiple documents
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
    validation(createApartmentSchema),
    apartmentController.createApartment
  );

  return router;
};
