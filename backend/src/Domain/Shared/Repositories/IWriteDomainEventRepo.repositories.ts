export interface IWriteDomainEventRepo {
  save(eventLogs: any[]): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
}
