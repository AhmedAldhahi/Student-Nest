import { Request, Response } from "express";
import { GetAllAuditLogQueriesHandler } from "../../../../Application/BoundedContexts/Adminstration/QueriesHandler/GetAllAuditLogQueries";
import { SearchForAuditLogByQueriesHandler } from "../../../../Application/BoundedContexts/Adminstration/QueriesHandler/SeachForAuditLogQueriesHandler";
export class AuditLogController {
  constructor(
    private readonly getAllAuditLogQH: GetAllAuditLogQueriesHandler,
    private readonly FindAuditLogQueryQH: SearchForAuditLogByQueriesHandler
  ) {}

  public GetAllAuditLog = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.getAllAuditLogQH.handle();

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server Error" });
    }
  };

  public GetAuditLogQuery = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const query = (req.query.q as string) || "";

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.FindAuditLogQueryQH.handle({ query: query });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
