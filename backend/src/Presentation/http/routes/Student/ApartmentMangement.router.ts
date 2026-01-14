import { Router } from "express";
import { ApartmentControllerForStudent } from "../../controllers/Apartment/ApartmentControllerForStudent";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";

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
