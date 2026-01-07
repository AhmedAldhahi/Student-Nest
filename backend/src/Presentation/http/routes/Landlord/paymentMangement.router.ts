import { Router } from "express";
import { PaymentController } from "../../controllers/Landlord/PaymentMangement.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isLandlord } from "../../middlewares/auth/isLandloard.middleware";

export const PaymentRouter = (paymentController: PaymentController): Router => {
  const router = Router();

  router.get(
    "/:leaseId/:paymentId/receipt",
    isAuth,
    isLandlord,
    paymentController.getReceiptsForSinglePayment
  );

  router.get(
    "/:apartmentId/:leaseId",
    isAuth,
    isLandlord,
    paymentController.getAllPaymentForSingleLeases
  );

  return router;
};
