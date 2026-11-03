import { Request, Response } from "express";
import { SearchForAllLeaseForLandlordForSingleApartmentQueriesHandler } from "../../../../Application/BoundedContexts/Lease/QueriesHandler/SearchForLeaseForSingleApartmentQueriesHandler";
import { GetAllLeaseForSingleApartmentQueriesHandler } from "../../../../Application/BoundedContexts/Lease/QueriesHandler/GetAllLeaseForSingleApartmentQueriesHandler";

export class LeaseManagementForLandlord {
  constructor(
    private readonly SearchAllLeaseForSingleApartmentQH: SearchForAllLeaseForLandlordForSingleApartmentQueriesHandler,
    private readonly GetAllLeasesForSingleApartmentsQH: GetAllLeaseForSingleApartmentQueriesHandler
  ) {}

  public SearchAllLeasesForSingleApartment = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user?.userId;
      const { apartmentId } = req.params;
      const query = (req.query.q as string) || "";

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.SearchAllLeaseForSingleApartmentQH.handle({
        userId: userId,
        apartmentId: apartmentId,
        queries: query,
      });

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
      const userId = req.user?.userId;
      const { apartmentId } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.GetAllLeasesForSingleApartmentsQH.handle({
        userId: userId,
        apartmentId: apartmentId,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
