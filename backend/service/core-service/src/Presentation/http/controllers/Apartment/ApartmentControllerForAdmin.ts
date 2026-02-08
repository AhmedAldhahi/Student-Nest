import { Request, Response } from "express";
import { ChangeApartmentStatusVerifiedCommandHandler } from "../../../../Application/BoundedContexts/Adminstration/CommandHandler/ChnageApartmentVerificationStatusCommandHandler";

export class ApartmentManagementControllerForAdmin {
  constructor(
    private readonly changeApartmentVerificationStatusCH: ChangeApartmentStatusVerifiedCommandHandler,
  ) {}

  public updateApartmentVerificationStatus = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const userId = req.user?.userId;
      const { id } = req.params;
      const { Verified } = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.changeApartmentVerificationStatusCH.handle({
        apartmentId: id,
        Verified: Verified,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      console.error("fail update status,", error);
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
