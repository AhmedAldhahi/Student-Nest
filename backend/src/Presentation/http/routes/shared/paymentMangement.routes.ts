import { Router } from "express";
import { PaymentController } from "../../controllers/Landlord/PaymentMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlordOrStudent } from "../../middlewares/auth/isLandlordOrStudent.middleware";

export const PaymentManagementRouter = (
  paymentController: PaymentController
): Router => {
  const router = Router();

  router.get(
    "/:leaseId/history",
    isAuth,
    isLandlordOrStudent,
    paymentController.GetPaidPaymentSchedule
  );

  return router;
};
