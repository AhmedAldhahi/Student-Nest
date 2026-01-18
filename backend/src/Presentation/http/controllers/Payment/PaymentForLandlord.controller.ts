import { Request, Response } from "express";
import { ChangeStatusOfPaymentCommandHandler } from "../../../../Application/BoundedContexts/Payment/CommandHandler/ChangeStatusOfPaymentCommandHandler";
import { GetReceiptForSinglePaymentQueriesHandler } from "../../../../Application/BoundedContexts/Payment/QueriesHandler/GetReceiptForSinglePaymentQueriesHandler";
export class PaymentForLandlordController {
  constructor(
    private readonly ChangePaymentStatusCH: ChangeStatusOfPaymentCommandHandler,
  ) {}

  public editPaymentStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseId } = req.params;
      const { paymentId } = req.params;
      const dto = req.body.status;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.ChangePaymentStatusCH.handle({
        userId: userId,
        leaseId: leaseId,
        paymentId: paymentId,
        status: dto,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server Error" });
    }
  };

  
}
