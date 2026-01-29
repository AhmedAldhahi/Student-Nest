import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { ApartmentControllerForStudent } from "../../controllers/Apartment/ApartmentControllerForStudent";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { ApartmentRouter } from "./ApartmentMangement.router";
import { LeaseRequestForStudentController } from "../../controllers/LeaseRequest/LeaseRequstForStudent.controller";
import { leaseRequestRouter } from "./LeaseRequestMangement.router";
import { PaymentRouter } from "./PaymentMangement.router";
import { PaymentForStudentController } from "../../controllers/Payment/PaymentForStudent.controller";
import { RoommateProfileControllerForStudent } from "../../controllers/RoommateProfile/RoommateProfileControllerForStudent.controller";
import { RoommateProfileRouter } from "./RoommateProfile.router";
import { LeaseControllerForStudent } from "../../controllers/Lease/LeaseForStudent.controller";
import { LeaseRouter } from "./LeaseMangement.router";
import { globalStudentRateLimit } from "../../middlewares/rate-limited/GlobalRateLimit/GlobalStudentRateLimit.middleware";

export const StudentIndexRouter = (
  apartmentController: ApartmentControllerForStudent,
  LeaseRequestsController: LeaseRequestForStudentController,
  paymentController: PaymentForStudentController,
  roommateController: RoommateProfileControllerForStudent,
  LeaseController: LeaseControllerForStudent,
): Router => {
  const router = Router();

  router.use(globalStudentRateLimit);

  router.use("/apartments", ApartmentRouter(apartmentController));

  router.use("/lease-request", leaseRequestRouter(LeaseRequestsController));

  router.use("/payments", PaymentRouter(paymentController));

  router.use("/roommate-profile", RoommateProfileRouter(roommateController));

  router.use("/leases", LeaseRouter(LeaseController));

  return router;
};
