import { Router } from "express";
import { AuthController } from "../../controllers/Registration.controller";
import { validation } from "../../middlewares/validation.middleware";
import { RegisterStudetSchema } from "../../validation/auth/RegisterStudentSchema.zod";
import { RegisterLandloardSchema } from "../../validation/auth/RegisterStudentSchema.zod";
import { registerApiRateLimited } from "../../middlewares/rate-limited/registerRatLimited.middleware";
import { loginRateLimited } from "../../middlewares/rate-limited/loginRateLimit.middleware";
import { loginSchema } from "../../validation/auth/loginUserSchema.zod";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
/**
 * Creates the auth router.
 * @param authController An instance of AuthController
 * @returns The configured Express Router
 */
export const createAuthRouter = (authController: AuthController): Router => {
  // 1. Create a new router instance
  const router = Router();

  // 2. Define the routes and connect them to controller methods

  router.post(
    "/register/student",
    upload.single("verificationFile"),
   validation(RegisterStudetSchema),
    registerApiRateLimited,
    authController.registerStudent
  );

  router.post(
    "/register/landlord",
    upload.single("document"),
    validation(RegisterLandloardSchema),
    registerApiRateLimited,
    authController.registerLandlord
  );

  router.post(
    "/login",
    validation(loginSchema),
    loginRateLimited,
    authController.loginUser
  );

  // 3. Return the configured router
  return router;
};
