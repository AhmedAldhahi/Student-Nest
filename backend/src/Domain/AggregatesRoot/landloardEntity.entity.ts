/**
 * Represents the required data for creating a LandlordEntity.
 *
 * @interface ILandlordData
 * @property {UserEntity} user - The user aggregate associated with the landlord.
 * @property {string} cliQAccount - The landlord's CliQ account identifier.
 * @property {GovernmentID} landlordGovId - Value object representing the landlord's government ID.
 */

import { UserEntity } from "../Entities/userEntity.entity";
import { GovernmentID } from "../Value-Object/UserGovId.vo";
import { VerificationDocument } from "../Value-Object/VerficationDocument.vo";

export interface ILandlordData {
  user: UserEntity;
  cliQAccount: string;
  landlordGovId: GovernmentID;
  document: VerificationDocument;
  verified?: boolean;
}

export class LandlordAggregateRoot {
  private user: UserEntity;
  private landlordGovId: GovernmentID;
  private cliQAccount: string;
  private verifiedLandlord: boolean;
  private document: VerificationDocument;

  
  constructor(data: ILandlordData) {
    this.user = data.user;
    this.cliQAccount = data.cliQAccount;
    this.landlordGovId = data.landlordGovId;
    this.document = data.document;
    this.verifiedLandlord = data.verified ?? false;
  }

  public getUserId(): string {
    return this.user.getUserId();
  }

  public getGovId(): string | undefined {
    return this.landlordGovId.getValue() ?? undefined;
  }

  public updateVerificationFile(file: VerificationDocument): void {
    this.document = file;
  }

  public getVerificationFile(): string | undefined {
    return this.document.getValue() ?? undefined;
  }

  public markLandlordAsVerified(): void {
    this.verifiedLandlord = true;
  }

  public resetLandlordVerified(): void {
    this.verifiedLandlord = false;
  }

  public getLandlordVerified(): boolean {
    return this.verifiedLandlord;
  }

  public updateCliQAccount(cliQ: string): void {
    this.cliQAccount = cliQ;
  }

  public getCliQAccount(): string {
    return this.cliQAccount;
  }

  public getUser(): UserEntity {
    return this.user;
  }
}
