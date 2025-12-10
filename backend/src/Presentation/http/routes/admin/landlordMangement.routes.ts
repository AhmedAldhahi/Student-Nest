import { Router } from "express";
import { LandloardManagementController } from "../../controllers/admin/landlordMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";

export const landlordManagementRouter = (
  landlordManagementRouter: LandloardManagementController
): Router => {
  const router = Router();

  router.get('/landlords',isAuth, isAdmin, landlordManagementRouter.getAllLandlords);

  return router;
};
