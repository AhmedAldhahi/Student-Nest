import { Request, Response } from "express";
import { GetAllLeaseRequestUseCase } from "../../../../Application/Use-Case/admin/LeaseRequestMangament/getAllLeaseRequest.usecase";
import { GetLeaseRequestByIdUseCase } from "../../../../Application/Use-Case/admin/LeaseRequestMangament/getLeaseRequestById.usecase";
export class LeaseRequestManagementController {
  constructor(
    private readonly GetAllLeaseRequest: GetAllLeaseRequestUseCase,
    private readonly GetLeaseRequestByID: GetLeaseRequestByIdUseCase
  ) {}

  public getAllLeaseRequest = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllLeaseRequest.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      throw error;
    }
  };

  public getLeaseRequestById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseRequestId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetLeaseRequestByID.execute(
        Number(leaseRequestId)
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
