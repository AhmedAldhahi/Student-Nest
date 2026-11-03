import { Request, Response } from "express";
import { LeaseRequestContext } from "../../../../Application/BoundedContexts/Shared/Strategy/leaseRequest/LeaseRequestContext";
export class SharedLeaseRequestController {
  constructor(private readonly userLeaseRequestContext: LeaseRequestContext) {}

  public getAllLeaseRequest = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.userLeaseRequestContext.executeGetAllLeaseRequest(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      throw error;
    }
  };

  public getLeaseRequestByQuery = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const query = (req.query.q as string) || "";

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.userLeaseRequestContext.executeSearchLeaseRequest(
          userId,
          query
        );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
