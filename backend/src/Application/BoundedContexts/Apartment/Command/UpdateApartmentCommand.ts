import { ICommand } from "../../Shared/abstraction/ICommand";
import { UpdateApartmentDataRequest } from "../Dto/Request/UpdateApartmentRequest";

export class UpdateApartmentDetailByIdCommand implements ICommand {
  public title?: string;
  public description?: string;
  public address?: string;
  public numberOfBed?: string;
  public numberOfRoom?: string;
  public isJoin?: boolean;
  public price?: string;
  public id: string;
  public photos?: Express.Multer.File[];
  public userId: string;

  constructor(data: UpdateApartmentDataRequest, id: string, userId: string) {
    this.title = data.title;
    this.description = data.description;
    this.address = data.address;
    this.numberOfBed = data.numberOfBed;
    this.numberOfRoom = data.numberOfRoom;
    this.isJoin = data.isJoin;
    this.price = data.price;
    this.id = id;
    this.photos = data.photos;
    this.userId = userId;
  }
}
