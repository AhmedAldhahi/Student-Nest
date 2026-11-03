import { Router } from "express";
import { ApartmentControllerForStudent } from "../../controllers/Apartment/ApartmentControllerForStudent";
import { featuredApartmentRateLimit } from "../../middlewares/rate-limited/Apartment/futureApartmentRateLimit.middleware";
import { availableApartmentRateLimit } from "../../middlewares/rate-limited/Apartment/availableApartmentRateLimit.middleware";

export const ApartmentRouter = (
  studentApartmentControllers: ApartmentControllerForStudent,
): Router => {
  const router = Router();

  router.get(
    "/featured",
    featuredApartmentRateLimit,
    studentApartmentControllers.GetRandomApartment,
  );

  router.get(
    "/available",
    availableApartmentRateLimit,
    studentApartmentControllers.GetAllVisibleAndNotFullApartments,
  );

  return router;
};
