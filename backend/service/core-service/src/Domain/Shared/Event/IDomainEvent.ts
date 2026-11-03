export interface IDomainEvent {
  readonly dateTimeOccurred: Date;
  getAggregateId(): string;
  getEventName(): string;
}
