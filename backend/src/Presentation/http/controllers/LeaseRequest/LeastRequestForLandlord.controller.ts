import { updateLeaseRequestCommandHandler } from "../../../../Application/BoundedContexts/LeaseRequest/CommandHandler/ChangeLeaseRequestCommandHandler";
import { Request, Response } from "express";
import { GetAllLeastRequestForSingleApartmentQueriesHandler } from "../../../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequestForLandlordForSingleApartmentQueriesHandler";
import { SearchForAllLeaseRequestForLandlordForSingleApartment } from "../../../../Application/BoundedContexts/LeaseRequest/QueriesHandler/SeachForAllLeasRequestForSingleApartmentQueriesHandler";

export class LeastRequestForLandlordController {
  constructor(
    private readonly updateLeastRequestCH: updateLeaseRequestCommandHandler,
    private readonly getAllLeaseRequestForSingleApartmentQH: GetAllLeastRequestForSingleApartmentQueriesHandler,
    private readonly SearchForAllLeasesRequestForSingleApartmentQH: SearchForAllLeaseRequestForLandlordForSingleApartment
  ) {}

  public UpdateLeastRequestStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leastRequestId } = req.params;
      const dto = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.updateLeastRequestCH.handle({
        status: dto.status,
        userId: userId,
        id: leastRequestId,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getAllLeasesRequestForSingleApartment = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user?.userId;
      const { apartmentId } = req.params;
      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.getAllLeaseRequestForSingleApartmentQH.handle({
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

  public searchForLeasesRequestForSingleApartment = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user?.userId;
      const { apartmentId } = req.params;
      const query = (req.query.q as string) || "";
      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result =
        await this.SearchForAllLeasesRequestForSingleApartmentQH.handle({
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
}
