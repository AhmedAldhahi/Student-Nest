import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class GetUserEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static EVENT_KEY = "Identity.GetProfile";

  constructor(public userId: string, public email: string) {}

  public getAggregateId(): string {
    return this.userId;
  }

  public getEventName(): string {
    return GetUserEvent.EVENT_KEY;
  }
}
