import { DeleteUserCommand } from "../../../Command/Commands/DeleteUserCommand";
import { DeleteUserCommandHandler } from "../../../Command/Handlers/DeleteUserCommandHandler";

export class DeleteLandlordByIdUseCase {
  constructor(private commandHandler: DeleteUserCommandHandler) {}

  public async execute(userId: string) {
    try {
      const command = new DeleteUserCommand(userId);
      await this.commandHandler.handle(command);

      return {
        message: "user been deleted ",
      };
    } catch (error: any) {
      console.error("fail to delete user !!");
      throw error;
    }
  }
}
