import { ICommand } from "../../Shared/abstraction/ICommand";
import { AddNewApartmentRequest } from "../Dto/Request/CreateApartmentRequest";

export class CreateApartmentCommand implements ICommand {
  public apartmentId: number;
  public isVisible: boolean;
  public title: string;
  public description: string;
  public price: string;
  public address: string;
  public Verified: boolean;
  public numberOfRoom: string;
  public numberOfBed: string;
  public isJoin: boolean;
  public createAt: Date;
  public updateAt: Date;
  public landlord: string;

  public apartmentPhoto: Express.Multer.File[];
  public googleMapLocationLong: string;
  public googleMapLocationLat: string;
  public apartmentDocument: Express.Multer.File | null;

  public constructor(data: AddNewApartmentRequest) {
    this.apartmentId = data.apartmentId;
    this.description = data.description;
    this.title = data.title;
    this.price = data.price;
    this.createAt = data.createAt;
    this.updateAt = data.updateAt;
    this.landlord = data.landlord;
    this.address = data.address;
    this.isJoin = data.isJoin;
    this.numberOfBed = data.numberOfBed;
    this.numberOfRoom = data.numberOfRoom;
    this.googleMapLocationLat = data.googleMapLocationLat;
    this.googleMapLocationLong = data.googleMapLocationLong;
    this.apartmentPhoto = data.apartmentPhoto;
  }
}
