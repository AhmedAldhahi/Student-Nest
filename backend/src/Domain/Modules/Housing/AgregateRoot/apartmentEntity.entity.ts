import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../Entities/googleMapLocationEntity.entity";
import { ApartmentPrice } from "../Value-Object/ApartmentPrice.vo";
import { NumberOfBed } from "../Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../Value-Object/NumberOfRoom.vo";
import { ApartmentPhotoDocumentEntity } from "../Entities/phohtoDocumentEntity.entity";
import { ApartmentData } from "../Types/IApartmentData.type";
import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";

export class ApartmentAggregateRoot extends AggregateRoot<string> {
  private apartmentId: string;
  private isVisible: boolean = false;
  private title: string;
  private description: string;
  private price: ApartmentPrice;
  private address: string;
  private isVerified: boolean = false;
  private numberOfRoom: NumberOfRoom;
  private numberOfBed: NumberOfBed;
  private isJoin: boolean; // be Roommate with students

  private createAt: Date;
  private updateAt: Date;
  private landlord: string;

  private apartmentDocument: ApartmentDocumentEntity | null;
  private googleMapLocation: GoogleMapLocationEntity;
  private apartmentPhotoDocument: ApartmentPhotoDocumentEntity[];

  constructor(data: ApartmentData) {
    super();
    this.apartmentId = data.apartmentId;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.address = data.address;
    this.numberOfBed = data.numberOfBed;
    this.numberOfRoom = data.numberOfRoom;
    this.isJoin = data.isJoin;
    this.createAt = data.createAt;
    this.updateAt = data.updateAt;

    this.landlord = data.landlordId;
    this.apartmentDocument = data.apartmentDocument;
    this.googleMapLocation = data.googleMapLocation;
    this.apartmentPhotoDocument = data.apartmentPhoto;
  }

  // factory method
  public static create(data: ApartmentData) {
    return new ApartmentAggregateRoot(data);
  }

  /**
   * ==================================================================================
   *                              Behavior sections
   * ==================================================================================
   */

  public ValidatePhotoSize(): void {
    if (this.getNumberOfPhotos() > 6)
      throw new Error("the size limit is 6 for photo ");
  }

  public addPhoto(photo: ApartmentPhotoDocumentEntity): void {
    if (!photo) throw new Error("No photo provided to add.");

    if (this.apartmentPhotoDocument.length >= 6) {
      throw new Error("Cannot add photo. The limit is 6 photos per apartment.");
    }

    this.apartmentPhotoDocument.push(photo);
    this.updateAt = new Date();
  }

  public removePhoto(photoId: string): void {
    this.apartmentPhotoDocument = this.apartmentPhotoDocument.filter(
      (p) => p.getPhotoId() !== photoId
    );
    this.updateAt = new Date();
  }

  public AddApartmentDocument(apartmentDoc: ApartmentDocumentEntity): void {
    if (!apartmentDoc) return;

    this.apartmentDocument = apartmentDoc;
    this.updateAt = new Date();
  }

  /**
   * ==================================================================================
   *                              Getter Methods
   * ==================================================================================
   */

  public getNumberOfPhotos(): number {
    return this.apartmentPhotoDocument.length;
  }

  public getApartmentId(): string {
    return this.apartmentId;
  }

  public getIsVisible(): boolean {
    return this.isVisible;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getAddress(): string {
    return this.address;
  }

  public getIsJoin(): boolean {
    return this.isJoin;
  }

  public getIsVerified(): boolean {
    return this.isVerified;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getUpdateAt(): Date {
    return this.updateAt;
  }

  public getLandlord(): string {
    return this.landlord;
  }

  public getApartmentDocument(): ApartmentDocumentEntity | null {
    return this.apartmentDocument ?? null;
  }

  public getGoogleMapLocation(): GoogleMapLocationEntity {
    return this.googleMapLocation;
  }

  public getApartmentPhotoDocument(): ApartmentPhotoDocumentEntity[] {
    return this.apartmentPhotoDocument;
  }

  public getApartmentPrice(): string | undefined {
    return this.price.getValue() ?? undefined;
  }

  public getNumberOfBed(): string | undefined {
    return this.numberOfBed.getValue() ?? undefined;
  }

  public getNumberOfRoom(): string | undefined {
    return this.numberOfRoom.getValue() ?? undefined;
  }

  /**
   * ==================================================================================
   *                              Update Methods sections
   * ==================================================================================
   */

  public changeApartmentDetails(
    title?: string,
    description?: string,
    address?: string
  ) {
    if (title) this.title;
    if (description) this.description;
    if (address) this.address;

    this.updateAt = new Date();
  }

  public changeApartmentPricing(price: ApartmentPrice): void {
    this.price = price;
    this.updateAt = new Date();
  }

  public updateNumberOfBed(numOfBed: NumberOfBed): void {
    this.numberOfBed = numOfBed;
    this.updateAt = new Date();
  }

  public updateNumberOfRoom(numOfRoom: NumberOfRoom): void {
    this.numberOfRoom = numOfRoom;
    this.updateAt = new Date();
  }

  public updateApartmentPhotos(photos: ApartmentPhotoDocumentEntity[]): void {
    this.apartmentPhotoDocument = photos;
  }

  public markAsVerified(): void {
    this.isVerified = true;
  }

  public markAsNotVerified(): void {
    this.isVerified = false;
  }

  public markAsVisible(): void {
    this.isVisible = true;
  }

  public markAsNotVisible(): void {
    this.isVisible = false;
  }

  public markAsJoin(): void {
    this.isJoin = true;
  }

  public markAsNotJoin(): void {
    this.isJoin = false;
  }

  public updateAddress(address: string): void {
    this.address = address;
  }

  public updateIsJoin(isJoin: boolean): void {
    this.isJoin = isJoin;
  }

  public updateDescription(desc: string): void {
    this.description = desc;
  }

  public updateTitle(title: string): void {
    this.title = title;
  }
}
