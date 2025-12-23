import { Request, Response } from "express";
import { findAllApartmentUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/FindAllApartment.usecase";
import { FindAllApartmentByNameUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/findAllApartmentByName.usecase";
import { EditApartmentStatusVerifiedUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentStatus.usecase";
import { DeleteApartmentByIdUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/DeleteApartment.usecase";
import { findApartmentDocumentByIdUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDocument.usecase";
import { findApartmentByIdUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDetailsById.usecase";
import { EditApartmentDetailUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentDetail.usecase";
export class ApartmentManagementController {
  constructor(
    private readonly getAllApartment: findAllApartmentUseCase,
    private readonly getApartmentByName: FindAllApartmentByNameUseCase,
    private readonly editApartmentVerificationStatus: EditApartmentStatusVerifiedUseCase,
    private readonly deleteApartmentById: DeleteApartmentByIdUseCase,
    private readonly getApartmentDocumentById: findApartmentDocumentByIdUseCase,
    private readonly GetApartmentDetailById: findApartmentByIdUseCase,
    private readonly EditApartmentDetailsById: EditApartmentDetailUseCase
  ) {}

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

  public getApartmentsByName = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { name } = req.params;
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.getApartmentByName.execute(name);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public updateApartmentVerificationStatus = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user.userId;
      const { apartmentId } = req.params;
      const id = Number(apartmentId);
      const { Verified } = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.editApartmentVerificationStatus.execute({
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

  public DeleteApartmentById = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const { apartmentId } = req.params;
      const id = Number(apartmentId);

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.deleteApartmentById.execute(id);
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
      const userId = req.user.userId;
      const { id } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.getApartmentDocumentById.execute(Number(id));
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

      const result = await this.GetApartmentDetailById.execute(Number(id));
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public UpdateApartmentDetailsById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const dto = req.body;
      const { id } = req.params;

      console.log(dto);

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.EditApartmentDetailsById.execute(
        dto,
        Number(id)
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
