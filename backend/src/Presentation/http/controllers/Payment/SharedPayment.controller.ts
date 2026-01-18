import { Request, Response } from "express";
import { PaymentContext } from "../../../../Application/BoundedContexts/Shared/Strategy/Payment/PaymentContext";
export class SharedPaymentController {
  constructor(private readonly UserPaymentContext: PaymentContext) {}

  public GetPaidPaymentSchedule = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user Id been found !!" });

      const result =
        await this.UserPaymentContext.GetAllPaymentHistoryThatPaidExecute(
          userId,
          leaseId,
        );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getAllPaymentForSingleLeases = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result =
        await this.UserPaymentContext.GetAllPaymentScheduleForSingleLeasesExecute(
          userId,
          leaseId,
        );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
