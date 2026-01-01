import { IReadUserRepositories } from "../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { NotificationContext } from "../../Strategy/notification/notificationContext";

export class DeleteNotificationByIdUseCase {
  constructor(
    private readonly context: NotificationContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(id: number, userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      await this.context.executeDeleteNotificationById(
        userId,
        user.getRole(),
        id
      );
      return {
        message: "notification delete successfully",
      };
    } catch (error: any) {
      console.error("fail to delete notification !!");
      throw error;
    }
  }
}
