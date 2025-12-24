import { ApartmentDocumentType } from "../../../Domain/Enum/ApartmentDocument.enum";
import { EditApartmentDocumentDataRequest } from "../../Dtos/admin/EditApaartmentDocumentDToRequest.dtos";
import { ICommand } from "../ICommand";

export class UpdateApartmentDocumentFileCommand implements ICommand {
  public documentUrl?: string;
  public apartmentType?: ApartmentDocumentType;
  public id: number;

  constructor(data: EditApartmentDocumentDataRequest, id: number) {
    this.apartmentType = data.apartmentType;
    this.documentUrl = data.documentUrl;
    this.id = id;
  }
}
