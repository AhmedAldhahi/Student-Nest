import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { NotificationContext } from "../../Strategy/notification/notificationContext";

export class DeleteAllNotificationUseCase {
  constructor(
    private readonly context: NotificationContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);

      if (!user) throw new Error("no user been found !!");

      await this.context.executeDeleteNotifications(userId, user.getRole());

      return {
        message: "all notification deleted successful",
      };
    } catch (error: any) {
      console.error("fail to delete all notification !!");
      throw error;
    }
  }
}
