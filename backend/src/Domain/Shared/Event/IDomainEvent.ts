export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): string; // Every event must point back to an Entity
}
