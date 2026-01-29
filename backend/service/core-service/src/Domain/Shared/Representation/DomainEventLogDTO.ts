export interface DomainEventLogDto {
  id: string;
  aggregateId: string;
  eventName: string;
  payload: any;
  status: string;
  occurredOn: Date;
  processedAt?: Date;
  error?: string;
}
