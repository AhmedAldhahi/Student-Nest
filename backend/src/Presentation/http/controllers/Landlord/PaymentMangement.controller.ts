import { GetAllPaymentScheduleForSingleLeaseUseCase } from "../../../../Application/Use-Case/Landlord/Payment/GetPaymentSchedualForOneLease.usecase";
import { Request, Response } from "express";
import { GetReceiptForOnePaymentUseCase } from "../../../../Application/Use-Case/Landlord/Payment/GetReceiptForOnePayment.usecase";
import { EditPaymentStatusUseCase } from "../../../../Application/Use-Case/Landlord/Payment/EditPaymentStatus.usecase";
import { GetPaymentThatPaidUseCase } from "../../../../Application/Use-Case/Landlord/Payment/GetPaymentThatPaid.usecase";
export class PaymentController {
  constructor(
    private readonly GetAllPaymentForSingleLeases: GetAllPaymentScheduleForSingleLeaseUseCase,
    private readonly GetReceiptForSinglePayment: GetReceiptForOnePaymentUseCase,
    private readonly EditPaymentStatusUC: EditPaymentStatusUseCase,
    private readonly GetPaymentThatPaidUC: GetPaymentThatPaidUseCase
  ) {}

  public getAllPaymentForSingleLeases = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.GetAllPaymentForSingleLeases.execute(
        userId,
        leaseId
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

  public editPaymentStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseId } = req.params;
      const { paymentId } = req.params;
      const dto = req.body.status;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.EditPaymentStatusUC.execute(
        userId,
        leaseId,
        paymentId,
        dto
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(200)
        .json({ error: error.message || "internal server Error" });
    }
  };

  public GetPaidPaymentSchedule = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user Id been found !!" });

      const result = await this.GetPaymentThatPaidUC.execute(userId, leaseId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
