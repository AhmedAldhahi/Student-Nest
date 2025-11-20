import { UserEntity } from "./userEntity.entity";
import { GovernmentID } from "../value-object/UserGovId.vo";

export interface ILandlordData {
  user: UserEntity;
  cliQAccount: string;
  landlordGovId: GovernmentID;
}

export class LandlordEntity {
  private user: UserEntity;
  private landlordGovId: GovernmentID;
  private cliQAccount: string;

  constructor(data: ILandlordData) {
    this.user = data.user;
    this.cliQAccount = data.cliQAccount;
    this.landlordGovId = data.landlordGovId;
  }

  public getUserId(): string {
    return this.user.getUserId();
  }

  public getGovId(): string {
    return this.landlordGovId.getValue();
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
