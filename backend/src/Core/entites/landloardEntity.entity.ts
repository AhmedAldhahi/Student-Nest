/**
 * Represents the required data for creating a LandlordEntity.
 *
 * @interface ILandlordData
 * @property {UserEntity} user - The user aggregate associated with the landlord.
 * @property {string} cliQAccount - The landlord's CliQ account identifier.
 * @property {GovernmentID} landlordGovId - Value object representing the landlord's government ID.
 */

import { UserEntity } from "./userEntity.entity";
import { GovernmentID } from "../value-object/UserGovId.vo";
import { VerificationDocument } from "../value-object/VerficationDocument.vo";

/**
 * Represents the Landlord aggregate within the domain layer.
 *
 * This entity wraps:
 * - A `UserEntity` instance
 * - Landlord-specific value objects such as government ID and CliQ account
 *
 * @class LandlordEntity
 */
export interface ILandlordData {
  user: UserEntity;
  cliQAccount: string;
  landlordGovId: GovernmentID;
  document: VerificationDocument;
}

export class LandlordEntity {
  private user: UserEntity;
  private landlordGovId: GovernmentID;
  private cliQAccount: string;
  private verifiedLandlord: boolean = false;
  private document: VerificationDocument;

  /**
   * Creates a LandlordEntity containing user and landlord-specific identity data.
   *
   * @constructor
   * @param {ILandlordData} data - The required landlord initialization data.
   */
  constructor(data: ILandlordData) {
    this.user = data.user;
    this.cliQAccount = data.cliQAccount;
    this.landlordGovId = data.landlordGovId;
    this.document = data.document;
  }

  /**
   * Returns the landlord's user ID from the underlying UserEntity.
   *
   * @returns {string}
   */
  public getUserId(): string {
    return this.user.getUserId();
  }

  /**
   * Returns the landlord's government ID value.
   *
   * @returns {string}
   */
  public getGovId(): string {
    return this.landlordGovId.getValue();
  }

  public updateVerificationFile(file: VerificationDocument): void {
    this.document = file;
  }

  public getVerificationFile(): string {
    return this.document.getValue();
  }

  public markLandlordAsVerified() {
    this.verifiedLandlord = true;
  }

  public resetLandlordVerified() {
    this.verifiedLandlord = false;
  }

  /**
   * Updates the landlord's CliQ account number.
   *
   * @param {string} cliQ - New CliQ account.
   */
  public updateCliQAccount(cliQ: string): void {
    this.cliQAccount = cliQ;
  }

  /**
   * Returns the landlord's CliQ account.
   *
   * @returns {string}
   */
  public getCliQAccount(): string {
    return this.cliQAccount;
  }

  /**
   * Returns the associated UserEntity for this landlord.
   *
   * @returns {UserEntity}
   */
  public getUser(): UserEntity {
    return this.user;
  }
}
