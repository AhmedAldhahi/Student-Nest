import { Router } from "express";
import { ProfileController } from "../controllers/Profile.controller";
import { GetProfile } from "../middlewares/rate-limited/getProfileRatelimit.middleware";
import { isAuth } from "../middlewares/auth/isAuth.middleware";
import { updateProfile } from "../middlewares/rate-limited/updateProfileRateLimit.middleware";
import { validation } from "../middlewares/validation.middleware";
import multer from "multer";
import { RBAC } from "../middlewares/auth/RBAC.middleware";

const upload = multer({ storage: multer.memoryStorage() });

export const profileRouter = (profileController: ProfileController): Router => {
  const router = Router();

  router.get(
    "/profile",
    GetProfile,
    isAuth,
    profileController.getProfileDetails
  );

  router.patch(
    "/profile",
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "verificationFile", maxCount: 1 },
    ]),
    updateProfile,
    isAuth,
    RBAC,
    profileController.updateUserProfile
  );

  return router;
};
