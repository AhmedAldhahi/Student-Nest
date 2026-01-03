// Controllers/Housing/ApartmentController.ts
import { Request, Response } from "express";
import { ApartmentDataRequest } from "../../../../Application/DTO/landlord/addNewApartmentRequest.dto";
import { CreateApartmentUseCase } from "../../../../Application/Use-Case/Landlord/ApartmentMangement/CreateApartment.usecase";
import { AuditLogActionType } from "../../../../Domain/Shared/Enum/AuditLogAction.enum";
import { AddApartmentDocumentUseCase } from "../../../../Application/Use-Case/Landlord/ApartmentMangement/AddApartmentDocument.usecase";
import { UpdateApartmentDocumentUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/updateApartmentDocument.usecase";

export class ApartmentController {
  constructor(
    private readonly createApartmentUseCase: CreateApartmentUseCase,
    private readonly AddApartmentDocumentUC: AddApartmentDocumentUseCase,
    private readonly EditApartmentDocumentById: UpdateApartmentDocumentUseCase
  ) {}

  public createApartment = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      // 1. SECURITY
      const landlordId = (req as any).user?.userId;
      if (!landlordId) return res.status(401).json({ error: "Unauthorized" });

      let photos: Express.Multer.File[] = [];

      if (req.files) {
        // Cast to the correct type for safety
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        if (files["apartmentPhoto"]) {
          photos = files["apartmentPhoto"];
        }
      }

      // 3. VALIDATION
      if (photos.length === 0) {
        return res
          .status(400)
          .json({ error: "At least one apartment photo is required!" });
      }

      // 4. PREPARE DTO (Parsing Strings -> Types)
      // Multer sends body fields as strings, so we parse them.
      const dto: ApartmentDataRequest = {
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,

        // Parse Numbers
        numberOfBed: req.body.numberOfBed,
        numberOfRoom: req.body.numberOfRoom,
        price: req.body.price,
        googleMapLocationLat: req.body.googleMapLocationLat,
        googleMapLocationLong: req.body.googleMapLocationLong,
        apartmentDocument: [],

        // Parse Booleans ("true" -> true)
        propertyStatus: req.body.propertyStatus,
        isJoin: req.body.isJoin,

        // Files & ID
        landlord: landlordId,
        apartmentPhoto: photos, // Pass the extracted array

        createAt: new Date(),
        updateAt: new Date(),
        apartmentId: 0,
      };

      console.log("file : ", req.file);
      console.log("body : ", req.body);

      // 5. EXECUTE USE CASE
      const result = await this.createApartmentUseCase.execute(dto);

      // 6. AUDIT LOG
      req.audit = {
        actionType: AuditLogActionType.POST,
        description: "Landlord listed a new apartment",
        targetUserId: landlordId,
        targetUserName: (req as any).user?.name || "Landlord",
        targetUserRole: (req as any).user?.role || "landlord",
        record: "apartment",
        fieldName: { title: true, price: true, address: true },
      };

      return res.status(201).json({
        message: "Apartment created successfully",
        result,
      });
    } catch (error: any) {
      console.error("Controller Error:", error);
      return res
        .status(400)
        .json({ error: error.message || "Internal Server Error" });
    }
  };

  public addApartmentDocumentForApartment = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.user.userId;
      const { apartmentId } = req.params;
      const file = req.file;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      if (!file)
        return res
          .status(400)
          .json({ error: "apartmentDocument file is required" });

      const result = await this.AddApartmentDocumentUC.execute(userId, {
        apartmentId: apartmentId,
        apartmentDocumentUrl: file,
      });
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  //   public updateApartmentDocuments = async (
  //   req: Request,
  //   res: Response
  // ) => {
  //   try {
  //     const userId = (req as any).user?.userId;
  //     const { apartmentId, documentId } = req.params;
  //     const file = req.file;
  //     const { apartmentType } = req.body;

  //     if (!userId) {
  //       return res.status(401).json({ error: "Unauthorized" });
  //     }

  //     if (!apartmentId || !documentId) {
  //       return res.status(400).json({ error: "Invalid route parameters" });
  //     }

  //     if (!file && !apartmentType) {
  //       return res.status(400).json({
  //         error: "At least one field (file or apartmentType) is required",
  //       });
  //     }

  //     const result = await this.EditApartmentDocumentById.execute(
  //       {
  //         documentUrl: file,
  //         apartmentType,
  //       },
  //       apartmentId,
  //       documentId,
  //       userId
  //     );

  //     return res.status(200).json(result);
  //   } catch (error: any) {
  //     console.error("Update Apartment Document Error:", error);
  //     return res
  //       .status(500)
  //       .json({ error: error.message || "Internal Server Error" });
  //   }
  // };

  public updateApartmentDocuments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    
    // FIX: Trim whitespace to ensure " " is treated as empty
    const apartmentId = req.params.apartmentId?.trim();
    const documentId = req.params.documentId?.trim();
    const apartmentType = req.body;
    
    const file = req.file;

    // 1. Security & Basic Validation
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    
    // FIX: logic now correctly catches empty strings or spaces
    if (!apartmentId || !documentId) {
      return res
        .status(400)
        .json({ error: "Missing or invalid apartmentId or documentId" });
    }

    // ... rest of your code (Enum validation, etc) ...

    const result = await this.EditApartmentDocumentById.execute(
      {
        documentUrl: file,
        apartmentType: apartmentType,
      },
      apartmentId, // Pass trimmed ID
      documentId,  // Pass trimmed ID
      userId
    );

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Update Apartment Document Error:", error);
    return res
      .status(400) // Change 500 to 400 if it's a validation/input error
      .json({ error: error.message || "Internal Server Error" });
  }
};
}
