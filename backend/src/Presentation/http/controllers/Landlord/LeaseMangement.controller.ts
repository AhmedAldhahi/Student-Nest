import { GetAllLeaseForLandlordForSingleApartmentUseCase } from "../../../../Application/Use-Case/Landlord/LeaseMangement/GetAllLeaseForLandlordForSingleApartment.usecase";
import { SearchForAllLeaseForLandlordForSingleApartmentUseCase } from "../../../../Application/Use-Case/Landlord/LeaseMangement/SeachLeaseForLandlordForSingleApartment.usecase";
import { Request, Response } from "express";
export class LeaseManagement {
  constructor(
    private readonly SearchAllLeaseForApartmentUC: SearchForAllLeaseForLandlordForSingleApartmentUseCase,
    private readonly GetAllLeasesForApartmentsUC: GetAllLeaseForLandlordForSingleApartmentUseCase
  ) {}

  public SearchAllLeasesForSingleApartment = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user.userId;
      const { apartmentId } = req.params;
      const query = (req.query.q as string) || "";

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.SearchAllLeaseForApartmentUC.execute(
        userId,
        apartmentId,
        query
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getAllLeaseForSingleApartment = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user.userId;
      const { apartmentId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.GetAllLeasesForApartmentsUC.execute(
        userId,
        apartmentId
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
