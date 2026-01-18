import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlordOrStudent } from "../../middlewares/auth/isLandlordOrStudent.middleware";
import { SharedPaymentController } from "../../controllers/Payment/SharedPayment.controller";

export const PaymentManagementRouter = (
  paymentController: SharedPaymentController,
): Router => {
  const router = Router();

  router.get(
    "/:leaseId/history",
    isAuth,
    isLandlordOrStudent,
    paymentController.GetPaidPaymentSchedule,
  );

  router.get(
    "/:leaseId",
    isAuth,
    isLandlordOrStudent,
    paymentController.getAllPaymentForSingleLeases,
  );

  router.get(
    "/:leaseId/:paymentId/receipt",
    isAuth,
    isLandlordOrStudent,
    paymentController.getReceiptsForSinglePayment,
  );

  return router;
};
