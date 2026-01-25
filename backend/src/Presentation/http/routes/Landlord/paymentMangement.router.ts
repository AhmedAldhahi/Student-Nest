import { Router } from "express";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { UpdatePaymentStatus } from "../../validation/Landlord/payment.validation.zod";
import { PaymentForLandlordController } from "../../controllers/Payment/PaymentForLandlord.controller";
import { updatePaymentStatusRateLimit } from "../../middlewares/rate-limited/Payment/updatePaymentStatusRateLimit.middleware";

export const PaymentRouter = (
  paymentController: PaymentForLandlordController,
): Router => {
  const router = Router();

  router.patch(
    "/:leaseId/:paymentId/status",
    updatePaymentStatusRateLimit,
    isAuth,
    isLandlord,
    validation(UpdatePaymentStatus),
    paymentController.editPaymentStatus,
  );

  return router;
};
