import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class UpdateUserEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static EVENT_KEY = "Identity.update";
  constructor(public userId: string) {}

  public getAggregateId(): string {
    return this.userId;
  }
  public getEventName(): string {
    return UpdateUserEvent.EVENT_KEY;
  }
}
