import { EVENT_KEY } from "../../../../Shared/constants/EventHelper.constant";
import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class CreateLeaseEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static EVENT_KEY = EVENT_KEY.LEASE_CREATED;

  constructor(
    public leaseId: string,
    public leaseStartDate: string,
    public leaseEndDate: string,
    public monthlyRent: string,
  ) {}

  getAggregateId(): string {
    return this.leaseId;
  }

  getEventName(): string {
    return CreateLeaseEvent.EVENT_KEY;
  }
}
