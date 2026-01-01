export class deleteSpecificNotificationsCommand {
  public ids: number[];
  public userId: string;

  constructor(ids: number[], userId: string) {
    this.ids = ids;
    this.userId = userId;
  }
}
