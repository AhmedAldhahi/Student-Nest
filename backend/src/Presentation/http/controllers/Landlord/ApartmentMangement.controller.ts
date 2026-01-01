// Controllers/Housing/ApartmentController.ts
import { Request, Response } from "express";
import { ApartmentDataRequest } from "../../../../Application/DTO/apartment/addNewApartmentRequest.dto";
import { CreateApartmentUseCase } from "../../../../Application/Use-Case/Landlord/ApartmentMangement/CreateApartment.usecase";
import { AuditLogActionType } from "../../../../Domain/Shared/Enum/AuditLogAction.enum";

export class ApartmentController {
  constructor(private readonly createApartmentUseCase: CreateApartmentUseCase) {}

  public createApartment = async (req: Request, res: Response): Promise<any> => {
    try {
      // 1. SECURITY
      const landlordId = (req as any).user?.userId;
      if (!landlordId) return res.status(401).json({ error: "Unauthorized" });

      // 2. FILE EXTRACTION (The Fix)
      // When using upload.fields(), req.files is an object like:
      // { "apartmentPhoto": [File, File], "apartmentDocument": [File] }
      
      let photos: Express.Multer.File[] = [];
      let documents: Express.Multer.File[] = [];

      if (req.files) {
        // Cast to the correct type for safety
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files["apartmentPhoto"]) {
          photos = files["apartmentPhoto"];
        }

        if (files["apartmentDocument"]) {
          documents = files["apartmentDocument"];
        }
      }

      // 3. VALIDATION
      if (photos.length === 0) {
        return res.status(400).json({ error: "At least one apartment photo is required!" });
      }
      if (documents.length === 0) {
        return res.status(400).json({ error: "Ownership document is required!" });
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
          googleMapLocationLat: parseFloat(req.body.googleMapLocationLat),
          googleMapLocationLong: parseFloat(req.body.googleMapLocationLong),

          // Parse Booleans ("true" -> true)
          propertyStatus: req.body.propertyStatus === "true",
          isJoin: req.body.isJoin === "true",

          // Files & ID
          landlord: landlordId,
          apartmentPhoto: photos, // Pass the extracted array
          apartmentDocument: documents, // Pass the extracted array

          createAt: new Date(),
          updateAt: new Date(),
          apartmentId: 0
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
        fieldName: { title: true, price: true, address: true }
      };

      return res.status(201).json({ 
        message: "Apartment created successfully", 
        result 
      });

    } catch (error: any) {
      console.error("Controller Error:", error);
      return res.status(400).json({ error: error.message || "Internal Server Error" });
    }
  };
}