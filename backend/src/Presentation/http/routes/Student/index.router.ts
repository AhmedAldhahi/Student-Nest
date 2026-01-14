import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentControllerForStudent } from "../../controllers/Apartment/ApartmentControllerForStudent";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { ApartmentRouter } from "./ApartmentMangement.router";

export const StudentIndexRouter = (
  apartmentController: ApartmentControllerForStudent
): Router => {
  const router = Router();

  router.use(
    "/apartments",
    ApartmentRouter(apartmentController)
  );

  return router;
};
