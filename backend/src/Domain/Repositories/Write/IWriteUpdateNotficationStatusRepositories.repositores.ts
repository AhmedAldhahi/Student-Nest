export interface IWriteUpdateNotificationStatusRepo {
  updateNotificationStatus(status: boolean): Promise<void>;
}
