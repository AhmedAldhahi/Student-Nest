import { deleteApartmentByIdCommand } from "../../Command/Commands/DeleteApartmentByIdCommand";
import { deleteApartmentByIdCommandHandler } from "../../Command/Handlers/DeleteApartmentByIdCommandHandler";
import { IApartmentStrategy } from "./IApartment.strategy";

export class AdminDeleteApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly commandHandler: deleteApartmentByIdCommandHandler
  ) {}

  public async deleteApartments(userId: number): Promise<any> {
    try {
      const command = new deleteApartmentByIdCommand(userId);
      return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to delete apartments !!");
      throw error;
    }
  }
}
