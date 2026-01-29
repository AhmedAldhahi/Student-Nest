import { Request, Response } from "express";
import { LeaseContext } from "../../../../Application/BoundedContexts/Shared/Strategy/lease/LeaseContext";

export class SharedLeaseManagementController {
  constructor(private readonly UserLeasesContext: LeaseContext) {}

  public getAllLease = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.UserLeasesContext.executeFindAllLease(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getLeaseByQuery = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const query = (req.query.q as string) || "";

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.UserLeasesContext.executeFindByQuery(
        query,
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
