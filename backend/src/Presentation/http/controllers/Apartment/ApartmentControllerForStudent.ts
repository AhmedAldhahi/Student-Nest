import { Request, Response } from "express";
import { GetRandomlyThreeApartmentThatIsVisibleAndNotFull } from "../../../../Application/BoundedContexts/Apartment/QueriesHandler/GetRandomlyThreeApartmentsVisableAndNotFull";

export class ApartmentControllerForStudent {
  constructor(
    private readonly GetApartmentRandomThatIsVisibleAndNotFull: GetRandomlyThreeApartmentThatIsVisibleAndNotFull
  ) {}

  public GetRandomApartment = async (req: Request, res: Response) => {
    try {
      const user = req.user?.userId;
      if (!user)
        return res.status(400).json({ error: "no user id been found !!" });

      const result =
        await this.GetApartmentRandomThatIsVisibleAndNotFull.handle();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
