import { Request, Response } from "express";
import { CreateLeaseCommandHandler } from "../../../../Application/BoundedContexts/Lease/CommandHandler/CreateLeaseCommandHandler";

export class LeaseControllerForStudent {
  constructor(private readonly createLeaseCH: CreateLeaseCommandHandler) {}

  public createLease = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leaseRequestId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.createLeaseCH.handle({
        userId: userId,
        leaseRequestId: leaseRequestId,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
