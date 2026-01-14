import { Request, Response } from "express";
import { ApartmentContext } from "../../../../Application/BoundedContexts/Shared/Strategy/apartment/ApartmentContext";

export class SharedApartmentManagementController {
  constructor(private readonly userApartmentContext: ApartmentContext) {}

  public getAllApartments = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.userApartmentContext.executeGetAllApartments(
        userId
      );

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
          query
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
        apartmentId
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
          id,
          userId
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

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.userApartmentContext.executeGetApartmentDetailById(
          id,
          userId
        );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
