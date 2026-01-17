import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentControllerForStudent } from "../../controllers/Apartment/ApartmentControllerForStudent";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { ApartmentRouter } from "./ApartmentMangement.router";
import { LeaseRequestForStudentController } from "../../controllers/LeaseRequest/LeaseRequstForStudent.controller";
import { leaseRequestRouter } from "./LeaseRequestMangement.router";

export const StudentIndexRouter = (
  apartmentController: ApartmentControllerForStudent,
  LeaseRequestsController: LeaseRequestForStudentController
): Router => {
  const router = Router();

  router.use("/apartments", ApartmentRouter(apartmentController));

  router.use("/lease-request", leaseRequestRouter(LeaseRequestsController));

  return router;
};
