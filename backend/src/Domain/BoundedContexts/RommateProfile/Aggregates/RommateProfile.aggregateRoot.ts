import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { UserLanguage } from "../Enum/UserLanguage.enum";
import { RoommateProfileData } from "../types/RommateProfileData.type";

export class RoommateProfileAggregate extends AggregateRoot<string> {
  private roommateProfileId: string;
  private language: UserLanguage;

  constructor(data: RoommateProfileData) {
    super(data.roommateId);
    this.language = data.Language;
  }

  //Factory method
  public static create(data: RoommateProfileData) {
    return new RoommateProfileAggregate(data);
  }
}
