import { Router } from "express";
import { RoommateProfileControllerForStudent } from "../../controllers/RoommateProfile/RoommateProfileControllerForStudent.controller";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { RoommateProfileSchema } from "../../validation/Student/RoommateProfile.validation.zod";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const RoommateProfileRouter = (
  roommateProfileController: RoommateProfileControllerForStudent,
): Router => {
  const router = Router();

  router.post(
    "/",
    isAuth,
    isStudent,
    validation(RoommateProfileSchema),
    roommateProfileController.createRoommateProfile,
  );

  return router;
};
