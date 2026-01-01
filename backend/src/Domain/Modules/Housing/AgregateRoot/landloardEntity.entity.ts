/**
 * Represents the required data for creating a LandlordEntity.
 *
 * @interface ILandlordData
 * @property {UserEntity} user - The user aggregate associated with the landlord.
 * @property {string} cliQAccount - The landlord's CliQ account identifier.
 * @property {GovernmentID} landlordGovId - Value object representing the landlord's government ID.
 */

import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { GovernmentID } from "../../../Shared/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Shared/Value-Object/VerficationDocument.vo";
import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { ApartmentData } from "../Types/IApartmentData.type";
import { ILandlordData } from "../Types/ILandlordData.type";
import { ApartmentAggregateRoot } from "./apartmentEntity.entity";

export class LandlordAggregateRoot extends AggregateRoot<string> {
  private userId: string;
  private landlordGovId: GovernmentID;
  private cliQAccount: string;
  private isVerifiedLandlord: boolean;
  private document: VerificationDocument;

  constructor(data: ILandlordData) {
    super();
    this.userId = data.userId;
    this.cliQAccount = data.cliQAccount;
    this.landlordGovId = data.landlordGovId;
    this.document = data.document;
    this.isVerifiedLandlord = data.isVerifiedLandlord ?? false;
  }

  // behavior logic

  /**
   * ==================================================================================
   *                              Behavior Methods sections
   * ==================================================================================
   */

  public addNewApartment(apartmentInfo: ApartmentData) {
    this.ensureIsLandlordVerified();

    if (
      !apartmentInfo.apartmentDocument ||
      apartmentInfo.apartmentDocument.length === 0
    ) {
      throw new Error("apartment document is require !!");
    }

    if (
      !apartmentInfo.apartmentPhoto ||
      apartmentInfo.apartmentPhoto.length === 0
    ) {
      throw new Error("apartment photo is require !!");
    }

    if (apartmentInfo.apartmentPhoto.length > 6) {
      throw new Error("max size of photo is 6 ");
    }

    if (!apartmentInfo.googleMapLocation) {
      throw new Error("apartment google map location is require ");
    }

    const NewApartment = new ApartmentAggregateRoot({
      apartmentId: apartmentInfo.apartmentId,
      propertyStatus: true, // is for check if it full or not if not true, if yes false
      title: apartmentInfo.title,
      description: apartmentInfo.description,
      price: apartmentInfo.price,
      address: apartmentInfo.address,
      numberOfRoom: apartmentInfo.numberOfRoom,
      numberOfBed: apartmentInfo.numberOfBed,
      isJoin: apartmentInfo.isJoin,
      isFully: false, // maybe will delete it
      landlordId: this.userId,
      apartmentDocument: [],
      apartmentPhoto: apartmentInfo.apartmentPhoto,
      googleMapLocation: apartmentInfo.googleMapLocation,
      Verified: false,
      createAt: apartmentInfo.createAt,
      updateAt: apartmentInfo.updateAt,
    });

    return NewApartment;
  }

  /**
   * ==================================================================================
   *                              Update Methods sections
   * ==================================================================================
   */

  public updateVerificationFile(file: VerificationDocument): void {
    this.document = file;
    this.isVerifiedLandlord = false;
  }

  public ensureIsLandlordVerified(): void {
    if (this.isVerifiedLandlord === false) {
      throw new Error("you have to be verified to apply your functionality ");
    }
  }

  public markLandlordAsVerified(): void {
    this.isVerifiedLandlord = true;
  }

  public resetLandlordVerified(): void {
    this.isVerifiedLandlord = false;
  }

  public updateCliQAccount(cliQ: string): void {
    if (cliQ.length < 3) throw new Error("invalid CliQ Account !!");
    this.cliQAccount = cliQ;
  }

  /**
   * ==================================================================================
   *                              Getter Methods sections
   * ==================================================================================
   */

  public getCliQAccount(): string {
    return this.cliQAccount;
  }

  public getLandlordVerified(): boolean {
    return this.isVerifiedLandlord;
  }

  public getVerificationFile(): string | undefined {
    return this.document.getValue() ?? undefined;
  }

  public getGovId(): string | undefined {
    return this.landlordGovId.getValue() ?? undefined;
  }

  public getUserId(): string {
    return this.userId;
  }
}
