import { Router } from "express";
import { loginSchema } from "../../validation/auth/loginUserSchema.zod";
import multer from "multer";
import { registerApiRateLimited } from "../../middlewares/rate-limited/registerRatLimited.middleware";
import { AuthController } from "../../controllers/IdentityAndAccess/Registration.controller";
import { validation } from "../../middlewares/validation.middleware";
import {
  RegisterLandlordSchema,
  RegisterStudentSchema,
} from "../../validation/auth/RegisterStudentSchema.zod";
import { loginRateLimited } from "../../middlewares/rate-limited/loginRateLimit.middleware";

const upload = multer({ storage: multer.memoryStorage() });

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post(
    "/register/student",
    upload.single("verificationFile"),
    validation(RegisterStudentSchema),
    registerApiRateLimited,
    authController.registerStudent
  );

  router.post(
    "/register/landlord",
    upload.single("document"),
    validation(RegisterLandlordSchema),
    registerApiRateLimited,
    authController.registerLandlord
  );

  router.post(
    "/login",
    validation(loginSchema),
    loginRateLimited,
    authController.loginUser
  );

  return router;
};
