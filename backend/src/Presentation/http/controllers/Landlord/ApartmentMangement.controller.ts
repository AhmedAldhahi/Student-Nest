// Controllers/Housing/ApartmentController.ts
import { Request, Response } from "express";
import { ApartmentDataRequest } from "../../../../Application/DTO/landlord/addNewApartmentRequest.dto";
import { CreateApartmentUseCase } from "../../../../Application/Use-Case/Landlord/ApartmentMangement/CreateApartment.usecase";
import { AuditLogActionType } from "../../../../Domain/Shared/Enum/AuditLogAction.enum";
import { AddApartmentDocumentUseCase } from "../../../../Application/Use-Case/Landlord/ApartmentMangement/AddApartmentDocument.usecase";
import { UpdateApartmentDocumentUseCase } from "../../../../Application/Use-Case/admin/ApartmentMangament/updateApartmentDocument.usecase";
import { ApartmentDocumentType } from "../../../../Domain/Shared/Enum/ApartmentDocument.enum";

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
        numberOfBed: req.body.numberOfBed,
        numberOfRoom: req.body.numberOfRoom,
        price: req.body.price,
        googleMapLocationLat: req.body.googleMapLocationLat,
        googleMapLocationLong: req.body.googleMapLocationLong,
        apartmentDocument: [],
        isJoin: req.body.isJoin === "true",
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

 public updateApartmentDocuments = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.userId;
      
      // Trim IDs to avoid "space" errors
      const apartmentId = req.params.apartmentId?.trim();
      const documentId = req.params.documentId?.trim();
      
      // ➤ FIX: Get the SPECIFIC field from the body, not the whole body object
      const rawType = req.body.apartmentType; 
      
      const file = req.file;

      // 1. Security & Basic Validation
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      if (!apartmentId || !documentId) {
        return res
          .status(400)
          .json({ error: "Missing or invalid apartmentId or documentId" });
      }

      // 2. Validate Enum (Only if user sent a type)
      let apartmentType: ApartmentDocumentType | undefined = undefined;

      if (rawType) {
        // Check if the string matches your Enum values
        const isValidType = Object.values(ApartmentDocumentType).includes(
          rawType as ApartmentDocumentType
        );

        if (!isValidType) {
          return res.status(400).json({
            error: `Invalid apartmentType. Must be one of: ${Object.values(
              ApartmentDocumentType
            ).join(", ")}`,
          });
        }
        // Safe to cast now that we validated it
        apartmentType = rawType as ApartmentDocumentType;
      }

      // 3. Ensure we have something to update
      if (!file && !apartmentType) {
        return res.status(400).json({
          error: "At least one field (file or apartmentType) is required for update",
        });
      }

      // 4. Execute Use Case
      const result = await this.EditApartmentDocumentById.execute(
        {
          documentUrl: file,
          apartmentType: apartmentType, // This is now a STRING (or undefined), not an Object
        },
        apartmentId,
        documentId,
        userId
      );

      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Update Apartment Document Error:", error);
      return res
        .status(400)
        .json({ error: error.message || "Internal Server Error" });
    }
  };
}
