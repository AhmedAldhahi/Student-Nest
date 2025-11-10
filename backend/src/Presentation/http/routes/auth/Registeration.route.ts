import { Router } from 'express';
import { AuthController } from '../../controllers/Registeration.controller';
// We don't import the use case here

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
    '/register/student', 
    authController.registerStudent
  );

  // Add other auth routes here
  // router.post('/login', authController.login);
  // router.post('/forgot-password', authController.forgotPassword);

  // 3. Return the configured router
  return router;
};