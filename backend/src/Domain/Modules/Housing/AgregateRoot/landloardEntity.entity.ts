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

  public addNewApartment(apartmentInfo: ApartmentAggregateRoot) {
    this.ensureIsLandlordVerified();

    if (
      !apartmentInfo.getApartmentPhotoDocument() ||
      apartmentInfo.getApartmentPhotoDocument().length === 0
    ) {
      throw new Error("apartment photo is require !!");
    }

    if (apartmentInfo.getApartmentPhotoDocument().length > 6) {
      throw new Error("max size of photo is 6 ");
    }

    if (!apartmentInfo.getGoogleMapLocation()) {
      throw new Error("apartment google map location is require ");
    }
  }


  public AddApartmentDocumentFile(apartment: ApartmentAggregateRoot,apartmentDoc: ApartmentDocumentEntity) {
    // make need validation
    

    apartment.AddApartmentDocument(apartmentDoc);
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
