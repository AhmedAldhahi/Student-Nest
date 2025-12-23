import { EditApartmentDataRequest } from "../../Dtos/admin/EditApartmentData.dtos";
import { ICommand } from "../ICommand";

export class EditApartmentDetailByIdCommand implements ICommand {
  public title?: string;
  public description?: string;
  public address?: string;
  public numberOfBed?: string;
  public numberOfRoom?: string;
  public isJoin?: boolean;
  public price?: string;
  public id: number;

  constructor(data: EditApartmentDataRequest, id: number) {
    this.title = data.title;
    this.description = data.description;
    this.address = data.address;
    this.numberOfBed = data.numberOfBed;
    this.numberOfRoom = data.numberOfRoom;
    this.isJoin = data.isJoin;
    this.price = data.price;
    this.id = id;
  }
}
