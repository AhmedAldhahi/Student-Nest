import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../Entities/googleMapLocationEntity.entity";
import { LandlordAggregateRoot } from "./landloardEntity.entity";
import { ApartmentPrice } from "../Value-Object/ApartmentPrice.vo";
import { numberOfBed } from "../Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../Value-Object/NumberOfRoom.vo";
import { ApartmentPhotoDocumentEntity } from "../Entities/phohtoDocumentEntity.entity";

export interface ApartmentData {
  apartmentId: number;
  propertyStatus: boolean;
  title: string;
  description: string;
  price: ApartmentPrice;
  address: string;
  Verified: boolean;
  numberOfRoom: NumberOfRoom;
  numberOfBed: numberOfBed;
  isJoin: boolean;
  createAt: Date;
  updateAt: Date;
  landlord: LandlordAggregateRoot;
  isFully: boolean;

  apartmentDocument: ApartmentDocumentEntity[];
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
  googleMapLocation: GoogleMapLocationEntity;
}

export class ApartmentAggregateRoot {
  private apartmentId: number;
  private propertyStatus: boolean;
  private title: string;
  private description: string;
  private price: ApartmentPrice; // vo
  private address: string;
  private Verified: boolean = false;
  private numberOfRoom: NumberOfRoom; // vo
  private numberOfBed: numberOfBed; // vo
  private isJoin: boolean;
  private isFully: boolean;

  private createAt: Date;
  private updateAt: Date;
  private landlord: LandlordAggregateRoot;
  private apartmentDocument: ApartmentDocumentEntity[];
  private googleMapLocation: GoogleMapLocationEntity;
  private apartmentPhotoDocument: ApartmentPhotoDocumentEntity[];

  constructor(data: ApartmentData) {
    this.apartmentId = data.apartmentId;
    this.propertyStatus = data.propertyStatus;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.address = data.address;
    this.numberOfBed = data.numberOfBed;
    this.numberOfRoom = data.numberOfRoom;
    this.isJoin = data.isJoin;
    this.createAt = data.createAt;
    this.updateAt = data.updateAt;

    this.landlord = data.landlord;
    this.apartmentDocument = data.apartmentDocument;
    this.googleMapLocation = data.googleMapLocation;
    this.apartmentPhotoDocument = data.apartmentPhoto;
  }

  public setApartmentId(id: number): void {
    this.apartmentId = id;
  }

  public getApartmentId(): number {
    return this.apartmentId;
  }

  public updatePropertyStatus(status: boolean): void {
    this.propertyStatus = status;
  }

  public getPropertyStatus(): boolean {
    return this.propertyStatus;
  }

  public updateTitle(title: string): void {
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }

  public updateDescription(desc: string): void {
    this.description = desc;
  }

  public getDescription(): string {
    return this.description;
  }

  public updateAddress(address: string): void {
    this.address = address;
  }

  public getAddress(): string {
    return this.address;
  }

  public updateJoin(isJoin: boolean): void {
    this.isJoin = isJoin;
  }

  public getIsJoin(): boolean {
    return this.isJoin;
  }

  public markAsJoin(): void {
    this.isJoin = true;
  }

  public markAsNotJoin(): void {
    this.isJoin = false;
  }

  public updateFully(fully: boolean): void {
    this.isFully = fully;
  }

  public getFully(): boolean {
    return this.isFully;
  }

  public markAsFul(): void {
    this.isFully = true;
  }

  public markAsNotFul(): void {
    this.isFully = false;
  }

  public updateVerified(verified: boolean): void {
    this.Verified = verified;
  }

  public getVerified(): boolean {
    return this.Verified;
  }

  public markAsVerified(): void {
    this.Verified = true;
  }

  public markAsNotVerified(): void {
    this.Verified = false;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getUpdateAt(): Date {
    return this.updateAt;
  }

  public getLandlord(): LandlordAggregateRoot {
    return this.landlord;
  }

  public getApartmentDocument(): ApartmentDocumentEntity[] {
    return this.apartmentDocument;
  }

  public getGoogleMapLocation(): GoogleMapLocationEntity {
    return this.googleMapLocation;
  }

  public getApartmentPhotoDocument(): ApartmentPhotoDocumentEntity[] {
    return this.apartmentPhotoDocument;
  }

  public updateApartmentPrice(price: ApartmentPrice): void {
    this.price = price;
  }

  public getApartmentPrice(): string | undefined {
    return this.price.getValue() ?? undefined;
  }

  public updateNumberOfBed(bedNum: numberOfBed): void {
    this.numberOfBed = bedNum;
  }

  public getNumberOfBed(): string | undefined {
    return this.numberOfBed.getValue() ?? undefined;
  }

  public updateNumberOfRoom(room: NumberOfRoom): void {
    this.numberOfRoom = room;
  }

  public getNumberOfRoom(): string | undefined {
    return this.numberOfRoom.getValue() ?? undefined;
  }

  //=======================Apartment aggregation method ====================//

  public updateApartmentPhotos(photos: ApartmentPhotoDocumentEntity[]): void {
    this.apartmentPhotoDocument = photos;
  }
}
