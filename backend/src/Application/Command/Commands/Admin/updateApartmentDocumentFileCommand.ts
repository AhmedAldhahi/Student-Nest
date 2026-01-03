import { ApartmentDocumentType } from "../../../../Domain/Shared/Enum/ApartmentDocument.enum";
import { EditApartmentDocumentDataRequest } from "../../../DTO/admin/EditApaartmentDocumentDToRequest.dto";
import { ICommand } from "../../ICommand";

export class UpdateApartmentDocumentFileCommand implements ICommand {
  public documentUrl?: Express.Multer.File;
  public apartmentType?: ApartmentDocumentType;
  public documentId: string;
  public apartmentId: string;
  public userId: string;

  constructor(
    data: EditApartmentDocumentDataRequest,
    apartmentId: string,
    documentId: string,
    userId: string
  ) {
    this.documentUrl = data.documentUrl;
    this.apartmentType = data.apartmentType;
    this.apartmentId = apartmentId;
    this.documentId = documentId;
    this.userId = userId;
  }
}
