import { Router } from "express";
import { PaymentController } from "../../controllers/Landlord/PaymentMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { UpdatePaymentStatus } from "../../validation/Landlord/payment.validation.zod";

export const PaymentRouter = (paymentController: PaymentController): Router => {
  const router = Router();

  router.get(
    "/:leaseId/:paymentId/receipt",
    isAuth,
    isLandlord,
    paymentController.getReceiptsForSinglePayment
  );

  router.get(
    "/:leaseId",
    isAuth,
    isLandlord,
    paymentController.getAllPaymentForSingleLeases
  );

  router.patch(
    "/:leaseId/:paymentId/status",
    isAuth,
    isLandlord,
    validation(UpdatePaymentStatus),
    paymentController.editPaymentStatus
  );

  router.get(
    "lease/:leaseId/history",
    isAuth,
    isLandlord,
    paymentController.GetPaidPaymentSchedule
  );

  return router;
};
