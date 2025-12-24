import { FindAllAuditLogUseCase } from "../../../../Application/Use-Case/admin/AuditLogMangament/FindAllAuditLog.usecase";
import { Request, Response } from "express";
export class AuditLogController {
  constructor(
    private readonly getAllAuditLogUseCases: FindAllAuditLogUseCase
  ) {}

  public GetAllAuditLog = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.getAllAuditLogUseCases.execute();

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server Error" });
    }
  };
}
