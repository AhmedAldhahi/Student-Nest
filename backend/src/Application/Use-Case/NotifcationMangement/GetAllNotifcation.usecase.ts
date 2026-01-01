import { IReadUserRepositories } from "../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { NotificationContext } from "../../Strategy/notification/notificationContext";

export class GetAllNotificationUseCase {
  constructor(
    private readonly context: NotificationContext,
    private readonly getUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string) {
    try {
      const user = await this.getUserRepo.findById(userId);
      if (!user) throw new Error("no user with this id been found !!");

      return await this.context.executeGetNotifications(userId, user.getRole());
    } catch (error: any) {
      throw error;
    }
  }
}
