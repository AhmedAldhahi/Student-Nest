import { GetForLeasesRequestForSingleApartmentUseCase } from "../../../../Application/Use-Case/Landlord/LeaseRequest/GetForLeasesRequestForSingleApartment.usecase";
import { SearchForLeaseRequestForSingleApartmentsUseCase } from "../../../../Application/Use-Case/Landlord/LeaseRequest/SeachForLeaseRequestForSingleApartment.usecase";
import { UpdateLeaseRequestUseCase } from "../../../../Application/Use-Case/Landlord/LeaseRequest/updateLeaseRequest.usecase";
import { Request, Response } from "express";

export class LeastRequestController {
  constructor(
    private readonly updateLeastRequestUC: UpdateLeaseRequestUseCase,
    private readonly getAllLeaseRequestForSingleApartmentUc: GetForLeasesRequestForSingleApartmentUseCase,
    private readonly SearchForAllLeasesRequestForSingleApartmentUc: SearchForLeaseRequestForSingleApartmentsUseCase
  ) {}

  public UpdateLeastRequestStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { leastRequestId } = req.params;
      const dto = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.updateLeastRequestUC.execute(
        userId,
        leastRequestId,
        dto
      );

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

      const result = await this.getAllLeaseRequestForSingleApartmentUc.execute(
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
        await this.SearchForAllLeasesRequestForSingleApartmentUc.execute(
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
}
