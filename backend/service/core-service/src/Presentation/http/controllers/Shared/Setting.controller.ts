import { Request, Response } from "express";
import { UpdateWhatsappVisibleCommandHandler } from "../../../../Application/BoundedContexts/RoommateProfile/CommandHandler/UodateWhatsappVisableStatusCommandHandler";
export class SettingController {
  constructor(
    private readonly updateWhatsappVisibleCH: UpdateWhatsappVisibleCommandHandler,
  ) {}

  public updateWhatsappVisible = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const dto = req.body;
      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.updateWhatsappVisibleCH.handle({
        userId: userId,
        whatsappStatus: dto.whatsappStatus,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
