import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlordOrStudent } from "../../middlewares/auth/isLandlordOrStudent.middleware";
import { SharedPaymentController } from "../../controllers/Payment/SharedPayment.controller";
import { paymentHistoryRateLimit } from "../../middlewares/rate-limited/Payment/PaymentHistoryRateLimit.middleware";

export const PaymentManagementRouter = (
  paymentController: SharedPaymentController,
): Router => {
  const router = Router();

  router.get(
    "/:leaseId/history",
    paymentHistoryRateLimit,
    isAuth,
    isLandlordOrStudent,
    paymentController.GetPaidPaymentSchedule,
  );

  router.get(
    "/:leaseId",
    paymentHistoryRateLimit,
    isAuth,
    isLandlordOrStudent,
    paymentController.getAllPaymentForSingleLeases,
  );

  router.get(
    "/:leaseId/:paymentId/receipt",
    paymentHistoryRateLimit,
    isAuth,
    isLandlordOrStudent,
    paymentController.getReceiptsForSinglePayment,
  );

  return router;
};
