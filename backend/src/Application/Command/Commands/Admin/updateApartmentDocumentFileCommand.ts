import { ApartmentDocumentType } from "../../../../Domain/Shared/Enum/ApartmentDocument.enum";
import { EditApartmentDocumentDataRequest } from "../../../DTO/admin/EditApaartmentDocumentDToRequest.dto";
import { ICommand } from "../../ICommand";

export class UpdateApartmentDocumentFileCommand implements ICommand {
  public documentUrl?: string;
  public apartmentType?: ApartmentDocumentType;
  public id: string;

  constructor(data: EditApartmentDocumentDataRequest, id: string) {
    this.apartmentType = data.apartmentType;
    this.documentUrl = data.documentUrl;
    this.id = id;
  }
}
