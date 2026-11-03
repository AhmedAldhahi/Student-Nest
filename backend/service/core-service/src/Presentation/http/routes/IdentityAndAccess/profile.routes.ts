import { Router } from "express";
import { ProfileController } from "../../controllers/IdentityAndAccess/Profile.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { updateProfile } from "../../middlewares/rate-limited/IdentityAndAccess/updateProfileRateLimit.middleware";
import multer from "multer";
import { RBAC } from "../../middlewares/auth/RBAC.middleware";
import { GetProfileRateLimit } from "../../middlewares/rate-limited/IdentityAndAccess/getProfileRatelimit.middleware";

const upload = multer({ storage: multer.memoryStorage() });

export const profileRouter = (profileController: ProfileController): Router => {
  const router = Router();

  router.get(
    "/profile",
    GetProfileRateLimit,
    isAuth,
    profileController.getProfileDetails
  );

  router.patch(
    "/profile",
    updateProfile,
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "verificationFile", maxCount: 1 },
    ]),
    isAuth,
    RBAC,
    profileController.updateUserProfile
  );

  return router;
};
