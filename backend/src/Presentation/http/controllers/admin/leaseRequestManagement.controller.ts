import { Request, Response } from "express";
import { GetAllLeaseRequestUseCase } from "../../../../Application/Use-Case/admin/LeaseRequestManagement/getAllLeaseRequest.usecase";
import { GetLeaseRequestByQueryUseCase } from "../../../../Application/Use-Case/admin/LeaseRequestManagement/getLeaseRequestByQuery.usecase";
export class LeaseRequestManagementController {
  constructor(
    private readonly GetAllLeaseRequest: GetAllLeaseRequestUseCase,
    private readonly GetLeaseRequestByQuery: GetLeaseRequestByQueryUseCase
  ) {}

  public getAllLeaseRequest = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllLeaseRequest.execute(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      throw error;
    }
  };

  public getLeaseRequestByQuery = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const leaseRequestId = (req.query.q as string) || "";

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetLeaseRequestByQuery.execute(
        leaseRequestId,
        userId
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
