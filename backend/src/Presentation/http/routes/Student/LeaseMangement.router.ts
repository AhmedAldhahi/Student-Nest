import { Router } from "express";
import { LeaseControllerForStudent } from "../../controllers/Lease/LeaseForStudent.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";

export const LeaseRouter = (
  leaseController: LeaseControllerForStudent,
): Router => {
  const router = Router();

  router.post("/:leaseRequestId", isAuth, isStudent, leaseController.createLease);

  return router;
};
