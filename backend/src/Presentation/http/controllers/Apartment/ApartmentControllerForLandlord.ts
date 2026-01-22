import { Request, Response } from "express";
import { CreateApartmentCommandHandler } from "../../../../Application/BoundedContexts/Apartment/CommandHandler/CreateApartmentCommandHandler";
import { CreateApartmentDocumentCommandHandler } from "../../../../Application/BoundedContexts/Apartment/CommandHandler/CreateApartmentDocumentCommandHandler";
import { UpdateApartmentDocumentFileCommandHandler } from "../../../../Application/BoundedContexts/Apartment/CommandHandler/UpdateApartmentDocumentCommandHandler";
import { UpdateApartmentDetailForLandlordCommandHandler } from "../../../../Application/BoundedContexts/Apartment/CommandHandler/UpdateApartmentDetailCommandHandler";
import { GetAllApartmentThatBeenBookedQueriesHandler } from "../../../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllApartmentForLandlordThatbookenQueriesHandler";
import { AuditLogActionType } from "../../../../Domain/BoundedContexts/adminstration/Enum/AuditLogAction.enum";

export class ApartmentControllerForLandlord {
  constructor(
    private readonly createNewApartmentCH: CreateApartmentCommandHandler,
    private readonly AddApartmentDocumentCH: CreateApartmentDocumentCommandHandler,
    private readonly EditApartmentDocumentByIdCH: UpdateApartmentDocumentFileCommandHandler,
    private readonly EditApartmentDetailsByIdCH: UpdateApartmentDetailForLandlordCommandHandler,
    private readonly GetApartmentBeenBookedQH: GetAllApartmentThatBeenBookedQueriesHandler,
  ) {}

  public createApartment = async (
    req: Request,
    res: Response,
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

      const result = await this.createNewApartmentCH.handle({
        apartmentId: 0,
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        numberOfBed: req.body.numberOfBed,
        numberOfRoom: req.body.numberOfRoom,
        price: req.body.price,
        googleMapLocationLat: req.body.googleMapLocationLat,
        googleMapLocationLong: req.body.googleMapLocationLong,
        apartmentDocument: null,
        apartmentPhoto: photos,
        isJoin: Boolean(req.body.isJoin),
        houseRule: req.body.houseRule,
        includeUtilities: req.body.includeUtilities,
        isVisible: false,
        Verified: false,

        landlord: landlordId,
        createAt: new Date(),
        updateAt: new Date(),
      });

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
    res: Response,
  ) => {
    try {
      const userId = req.user?.userId;
      const { apartmentId } = req.params;
      const file = req.file;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      if (!file)
        return res
          .status(400)
          .json({ error: "apartmentDocument file is required" });

      const result = await this.AddApartmentDocumentCH.handle({
        userId: userId,
        apartmentId: apartmentId,
        apartmentDocument: file,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public updateApartmentDocuments = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { apartmentId } = req.params; // DocumentId removed as per previous fix
      const file = req.file;
      const { apartmentType } = req.body;

      if (!userId) {
        console.warn(" Unauthorized: Missing User ID");
        return res
          .status(401)
          .json({ error: "Unauthorized: No user ID found." });
      }

      if (!apartmentId) {
        console.warn("Bad Request: Missing Apartment ID");
        return res
          .status(400)
          .json({ error: "Invalid route parameters: Missing apartmentId." });
      }

      const result = await this.EditApartmentDocumentByIdCH.handle({
        documentUrl: file,
        apartmentType: apartmentType,
        apartmentId: apartmentId,
        userId: userId,
      });

      console.log(" Success. Sending response.");
      return res.status(200).json(result);
    } catch (error: any) {
      if (error?.stack) {
      }

      return res.status(500).json({
        error: error?.message || "Internal Server Error",
        details: error, // Sending the object might help you see it in Postman too
      });
    }
  };

  public UpdateApartmentDetailsById = async (req: Request, res: Response) => {
    try {
      // 1. Extract IDs
      const userId = (req as any).user?.userId;
      const { id } = req.params; // Apartment ID

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: No user found." });
      }

      // 2. Extract Files (Ensure 'uploads.array' is used in Router)
      const files = req.files as Express.Multer.File[] | undefined;

      // 4. Handle deletedPhotoIds (Ensure it's an array of strings)
      let parsedDeletedIds: string[] = [];
      if (req.body.deletedPhotoIds) {
        if (Array.isArray(req.body.deletedPhotoIds)) {
          parsedDeletedIds = req.body.deletedPhotoIds;
        } else {
          parsedDeletedIds = [req.body.deletedPhotoIds];
        }
      }

      const result = await this.EditApartmentDetailsByIdCH.handle({
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        price: req.body.price,
        numberOfBed: req.body.numberOfBed,
        numberOfRoom: req.body.numberOfRoom,
        isJoin: Boolean(req.body.isJoin),
        photos: files || [],
        id: id,
        userId: userId,
        houseRule: req.body.houseRule,
        includeUtilities: req.body.includeUtilities,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Controller Error:", error);
      return res
        .status(400)
        .json({ error: error.message || "Internal Server Error" });
    }
  };

  public GetBookedApartment = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.GetApartmentBeenBookedQH.handle({
        userId: userId,
      });
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
