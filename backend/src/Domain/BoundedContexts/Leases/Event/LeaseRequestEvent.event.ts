import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class CreateLeaseRequestEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static EVENT_KEY = "leaseRequest.create";

  public constructor(public leaseRequestId: string, public userId: string) {}

  public getAggregateId(): string {
    return this.userId;
  }

  public getEventName(): string {
    return CreateLeaseRequestEvent.EVENT_KEY;
  }

  public getLeaseRequestId(): string {
    return this.leaseRequestId;
  }
}
