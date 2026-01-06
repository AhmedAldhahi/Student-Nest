import { UpdateLeaseRequestUseCase } from "../../../../Application/Use-Case/Landlord/LeaseRequest/updateLeaseRequest.usecase";
import { Request, Response } from "express";

export class LeastRequestController {
  constructor(
    private readonly updateLeastRequestUC: UpdateLeaseRequestUseCase
  ) {}

  public UpdateLeastRequestStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const { leastRequestId } = req.params;
      const dto = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.updateLeastRequestUC.execute(
        userId,
        leastRequestId,
        dto
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
