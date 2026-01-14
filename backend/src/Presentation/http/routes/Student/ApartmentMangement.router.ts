import { Router } from "express";
import { ApartmentControllerForStudent } from "../../controllers/Apartment/ApartmentControllerForStudent";

export const ApartmentRouter = (
  studentApartmentControllers: ApartmentControllerForStudent
): Router => {
  const router = Router();

  router.get("/featured", studentApartmentControllers.GetRandomApartment);

  router.get(
    "/available",
    studentApartmentControllers.GetAllVisibleAndNotFullApartments
  );

  return router;
};
