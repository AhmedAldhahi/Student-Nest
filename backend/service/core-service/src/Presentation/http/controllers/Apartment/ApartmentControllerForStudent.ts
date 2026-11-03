import { Request, Response } from "express";
import { GetRandomlyThreeApartmentThatIsVisibleAndNotFullQueriesHandler } from "../../../../Application/BoundedContexts/Apartment/QueriesHandler/GetRandomlyThreeApartmentsVisableAndNotFullQueriesHandler";
import { GetAllVisibleAndNotFullApartmentQueriesHandler } from "../../../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllVisableAndNotFullApartmentQueriesHandler";

export class ApartmentControllerForStudent {
  constructor(
    private readonly GetApartmentRandomThatIsVisibleAndNotFull: GetRandomlyThreeApartmentThatIsVisibleAndNotFullQueriesHandler,
    private readonly GetAllVisibleAndNotFullApartment: GetAllVisibleAndNotFullApartmentQueriesHandler
  ) {}

  public GetRandomApartment = async (req: Request, res: Response) => {
    try {
      const result =
        await this.GetApartmentRandomThatIsVisibleAndNotFull.handle();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public GetAllVisibleAndNotFullApartments = async (
    req: Request,
    res: Response
  ) => {
    try {
      const result = await this.GetAllVisibleAndNotFullApartment.handle();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
