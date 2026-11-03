import { Router } from "express";
import { loginSchema } from "../../validation/auth/loginUserSchema.zod";
import multer from "multer";
import { registerApiRateLimited } from "../../middlewares/rate-limited/IdentityAndAccess/registerRatLimited.middleware";
import { AuthController } from "../../controllers/IdentityAndAccess/Registration.controller";
import { validation } from "../../middlewares/validation.middleware";
import {
  RegisterLandlordSchema,
  RegisterStudentSchema,
} from "../../validation/auth/RegisterStudentSchema.zod";
import { loginRateLimited } from "../../middlewares/rate-limited/IdentityAndAccess/loginRateLimit.middleware";

const upload = multer({ storage: multer.memoryStorage() });

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post(
    "/register/student",
    registerApiRateLimited,
    upload.single("verificationFile"),
    validation(RegisterStudentSchema),
    authController.registerStudent
  );

  router.post(
    "/register/landlord",
    registerApiRateLimited,
    upload.single("document"),
    validation(RegisterLandlordSchema),
    authController.registerLandlord
  );

  router.post(
    "/login",
    loginRateLimited,
    validation(loginSchema),
    authController.loginUser
  );

  return router;
};
