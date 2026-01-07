import { GetAllPaymentScheduleForSingleLeaseUseCase } from "../../../../Application/Use-Case/Landlord/Payment/GetPaymentSchedualForOneLease.usecase";
import { Request, Response } from "express";
import { GetReceiptForOnePaymentUseCase } from "../../../../Application/Use-Case/Landlord/Payment/GetReceiptForOnePayment.usecase";
export class PaymentController {
  constructor(
    private readonly GetAllPaymentForSingleLeases: GetAllPaymentScheduleForSingleLeaseUseCase,
    private readonly GetReceiptForSinglePayment: GetReceiptForOnePaymentUseCase
  ) {}

  public getAllPaymentForSingleLeases = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { apartmentId } = req.params;
      const { leaseId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      if (!userId || !apartmentId || !leaseId) {
        return res.status(400).json({
          error: "Missing required parameters",
        });
      }

      const result = await this.GetAllPaymentForSingleLeases.execute(
        userId,
        leaseId,
        apartmentId
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getReceiptsForSinglePayment = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { paymentId } = req.params;
      const { leaseId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user been found !!" });

      const result = await this.GetReceiptForSinglePayment.execute(
        userId,
        paymentId,
        leaseId
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
