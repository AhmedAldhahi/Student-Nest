import { Router } from "express";
import { RoommateProfileControllerForStudent } from "../../controllers/RoommateProfile/RoommateProfileControllerForStudent.controller";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { validation } from "../../middlewares/validation.middleware";
import {
  RoommateProfileSchema,
  UpdateRoommateProfileSchema,
} from "../../validation/Student/RoommateProfile.validation.zod";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { profileModificationRateLimit } from "../../middlewares/rate-limited/RoommateProfile/ProfileModificationRateLimit.middleware";
import { profileRetrievalRateLimit } from "../../middlewares/rate-limited/RoommateProfile/ProfileRetriveRateLimit.middleware";
import { roommateMatchRateLimit } from "../../middlewares/rate-limited/RoommateProfile/RoommateMatchRateLimit.middleware";

export const RoommateProfileRouter = (
  roommateProfileController: RoommateProfileControllerForStudent,
): Router => {
  const router = Router();

  router.post(
    "/",
    profileModificationRateLimit,
    isAuth,
    isStudent,
    validation(RoommateProfileSchema),
    roommateProfileController.createRoommateProfile,
  );

  router.patch(
    "/",
    profileModificationRateLimit,
    validation(UpdateRoommateProfileSchema),
    isAuth,
    isStudent,
    roommateProfileController.updateRoommateProfile,
  );

  router.get(
    "/",
    profileRetrievalRateLimit,
    isAuth,
    isStudent,
    roommateProfileController.getRoommateProfile,
  );

  router.get(
    "/roommates",
    roommateMatchRateLimit,
    isAuth,
    isStudent,
    roommateProfileController.getRoommateProfileThatMatch,
  );



  return router;
};
