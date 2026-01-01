import { ApartmentPhotoDocumentEntity } from "../../../../Domain/Modules/Housing/Entities/phohtoDocumentEntity.entity";
import { EditApartmentDataRequest } from "../../../DTO/admin/EditApartmentData.dto";
import { ICommand } from "../../ICommand";

export class EditApartmentDetailByIdCommand implements ICommand {
  public title?: string;
  public description?: string;
  public address?: string;
  public numberOfBed?: string;
  public numberOfRoom?: string;
  public isJoin?: boolean;
  public price?: string;
  public id: string;
  public photos?: ApartmentPhotoDocumentEntity[];

  constructor(data: EditApartmentDataRequest, id: string) {
    this.title = data.title;
    this.description = data.description;
    this.address = data.address;
    this.numberOfBed = data.numberOfBed;
    this.numberOfRoom = data.numberOfRoom;
    this.isJoin = data.isJoin;
    this.price = data.price;
    this.id = id;
    this.photos = data.photos;
  }
}
