import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentControllerForStudent } from "../../controllers/Apartment/ApartmentControllerForStudent";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { ApartmentRouter } from "./ApartmentMangement.router";
import { LeaseRequestForStudentController } from "../../controllers/LeaseRequest/LeaseRequstForStudent.controller";
import { leaseRequestRouter } from "./LeaseRequestMangement.router";
import { PaymentRouter } from "./PaymentMangement.router";
import { PaymentForStudentController } from "../../controllers/Payment/PaymentForStudent.controller";

export const StudentIndexRouter = (
  apartmentController: ApartmentControllerForStudent,
  LeaseRequestsController: LeaseRequestForStudentController,
  paymentController: PaymentForStudentController,
): Router => {
  const router = Router();

  router.use("/apartments", ApartmentRouter(apartmentController));

  router.use("/lease-request", leaseRequestRouter(LeaseRequestsController));

  router.use("/payments", PaymentRouter(paymentController));

  return router;
};
