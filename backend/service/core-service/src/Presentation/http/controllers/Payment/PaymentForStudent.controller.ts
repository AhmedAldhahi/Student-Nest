import { Request, Response } from "express";
import { AddNewPaymentReceiptForPaymentCommandHandler } from "../../../../Application/BoundedContexts/Payment/CommandHandler/AddNewReceiptForPaymentCommandHandler";

export class PaymentForStudentController {
  constructor(
    private readonly addNewReceiptCH: AddNewPaymentReceiptForPaymentCommandHandler,
  ) {}

  public addNewReceiptForPayment = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseId } = req.params;
      const { paymentId } = req.params;
      const file = req.file;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      if (!file) {
        return res.status(400).json({ error: "Receipt image is required!" });
      }

      const result = await this.addNewReceiptCH.handle({
        userId: userId,
        leaseId: leaseId,
        paymentId: paymentId,
        documentUrl: file,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error " });
    }
  };
}
