import { ApartmentDocumentType } from "../../../../Domain/BoundedContexts/Housing/Enum/ApartmentDocument.enum";
import { ICommand } from "../../Shared/abstraction/ICommand";
import { UpdateApartmentDocumentDataRequest } from "../Dto/Request/UpdateApartmentDocumentRequest";

export class UpdateApartmentDocumentFileCommand implements ICommand {
  public documentUrl?: Express.Multer.File;
  public apartmentType?: ApartmentDocumentType;
  public apartmentId: string;
  public userId: string;

  constructor(
    data: UpdateApartmentDocumentDataRequest,
    apartmentId: string,
    userId: string
  ) {
    this.documentUrl = data.documentUrl;
    this.apartmentType = data.apartmentType;
    this.apartmentId = apartmentId;
    this.userId = userId;
  }
}
