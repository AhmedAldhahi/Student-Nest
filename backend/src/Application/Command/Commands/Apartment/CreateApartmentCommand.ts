import { ApartmentDataRequest } from "../../../DTO/landlord/addNewApartmentRequest.dto";
import { ICommand } from "../../ICommand";

export class CreateApartmentCommand implements ICommand {
  public apartmentId: number;
  public propertyStatus: boolean;
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
  public isFully: boolean;

  public apartmentPhoto: Express.Multer.File[];
  public googleMapLocationLong: string;
  public googleMapLocationLat: string;
  public apartmentDocument: Express.Multer.File[];

  public constructor(data: ApartmentDataRequest) {
    this.apartmentId = data.apartmentId;
    this.propertyStatus = data.propertyStatus;
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
    this.apartmentDocument = data.apartmentDocument;
  }
}
