import { EVENT_KEY } from "../../../../Shared/constants/EventHelper.constant";
import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class UserRegisteredEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static readonly EVENT_KEY = EVENT_KEY.USER_REGISTERED;

  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly otpCode: string
  ) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateId(): string {
    return this.userId;
  }
  getEventName(): string {
    return UserRegisteredEvent.EVENT_KEY;
  }
}
