import { Request, Response } from "express";
import { ApartmentContext } from "../../../../Application/BoundedContexts/Shared/Strategy/apartment/ApartmentContext";
import { GetApartmentByIdForGuestQueriesHandler } from "../../../../Application/BoundedContexts/Apartment/QueriesHandler/GetApartmentForGuestUserQueriesHandler";
import { FilterSearchForApartmentQueriesHandler } from "../../../../Application/BoundedContexts/Apartment/QueriesHandler/FilterSearchForApartmentQueriesHandler";
import { MakeFilterSearchRequest } from "../../../../Application/BoundedContexts/Apartment/Dto/Request/MakeFilterSeachRequest";
import { FilterApartmentCommand } from "../../../../Application/BoundedContexts/Apartment/Queries/FilterForApartment";

export class SharedApartmentManagementController {
  constructor(
    private readonly userApartmentContext: ApartmentContext,
    private readonly getApartmentDetailsForGuestQH: GetApartmentByIdForGuestQueriesHandler,
    private readonly getFilterApartmentQH: FilterSearchForApartmentQueriesHandler,
  ) {}

  public getAllApartments = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      console.log("userId : ", userId);

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.userApartmentContext.executeGetAllApartments(userId);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getApartmentsByQueries = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      console.log("user id : ", userId);
      const query = (req.query.q as string) || "";
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.userApartmentContext.GetApartmentsBySearchByQueries(
          userId,
          query,
        );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public DeleteApartmentById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { apartmentId } = req.params;

      console.log(`user id : ${userId}  and the id : ${apartmentId}`);

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.userApartmentContext.DeleteApartment(
        userId,
        apartmentId,
      );

      return res.status(200).json(result);
    } catch (error: any) {
      console.error("fail delete apartment,", error);
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public FindApartmentDocumentById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { id } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.userApartmentContext.executeApartmentDocumentById(
          userId,
          id,
        );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server Error" });
    }
  };

  public getApartmentDetailById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      console.log("id ", id);
      console.log("user id", userId);

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.userApartmentContext.executeGetApartmentDetailById(
          id,
          userId,
        );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getApartmentDetailForGuest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await this.getApartmentDetailsForGuestQH.handle({
        id: id,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

public getFilterApartment = async (req: Request, res: Response) => {
    try {
      const { age, price, University, isJoint } = req.query;

      const filterRequest: MakeFilterSearchRequest = {
        age: age ? ((age as string).split(",") as [string, string]) : undefined,
        price: price ? ((price as string).split(",") as [string, string]) : undefined,
        University: University as string,
        isJoint: isJoint === 'true' ? true : isJoint === 'false' ? false : undefined,
      };

      const result = await this.getFilterApartmentQH.handle(
        new FilterApartmentCommand(filterRequest),
      );

      return res.status(200).json(result);
      
    } catch (error: any) {
      console.error("Error in getFilterApartment Controller:", error);
      return res.status(400).json({
        error: error.message || "internal server error",
      });
    }
  };
}
