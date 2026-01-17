import { Router } from "express";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { LeaseRequestForStudentController } from "../../controllers/LeaseRequest/LeaseRequstForStudent.controller";
import { CreateLeaseRequestSchema } from "../../validation/Student/leaseRequest";
import { validation } from "../../middlewares/validation.middleware";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const leaseRequestRouter = (
  leaseRequestControllers: LeaseRequestForStudentController
): Router => {
  const router = Router();

router.post(
    "/:apartmentId", 
    isAuth,
    isStudent,
    validation(CreateLeaseRequestSchema),
    leaseRequestControllers.createLeaseRequest
  );

  return router;
};
