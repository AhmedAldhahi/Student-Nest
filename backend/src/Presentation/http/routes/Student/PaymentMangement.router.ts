import { Router } from "express";
import { PaymentForStudentController } from "../../controllers/Payment/PaymentForStudent.controller";
import multer from "multer";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";

const upload = multer({ storage: multer.memoryStorage() });

export const PaymentRouter = (
  paymentControllerForStudent: PaymentForStudentController,
): Router => {
  const router = Router();

  router.post(
    "/:leaseId/schedule/:paymentId/receipt",
    isAuth,
    isStudent,
    upload.single("receipt"),
    paymentControllerForStudent.addNewReceiptForPayment,
  );

  return router;
};
