import { Request, Response } from "express";
import { findAllApartmentUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/FindAllApartment.usecase";
export class ApartmentManagementController {
  constructor(private readonly getAllApartment: findAllApartmentUseCase) {}

  public getAllApartments = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.getAllApartment.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
