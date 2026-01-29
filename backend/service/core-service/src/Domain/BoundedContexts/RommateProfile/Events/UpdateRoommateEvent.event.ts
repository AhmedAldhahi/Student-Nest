import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class RoommateProfileEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static EVENT_KEY = "RoommateProfile.update";
  constructor(public userId: string) {}

  public getAggregateId(): string {
    return this.userId;
  }
  public getEventName(): string {
    return RoommateProfileEvent.EVENT_KEY;
  }
}