import { deleteApartmentByIdCommand } from "../../../Command/Commands/DeleteApartmentByIdCommand";
import { deleteApartmentByIdCommandHandler } from "../../../Command/Handlers/DeleteApartmentByIdCommandHandler";

export class DeleteApartmentByIdUseCase {
  constructor(
    private readonly commandHandler: deleteApartmentByIdCommandHandler
  ) {}

  public async execute(id: number) {
    try {
      const command = new deleteApartmentByIdCommand(id);
      await  this.commandHandler.handle(command);

      return {
        message: "apartment deleted successfully "
      }
    } catch (error: any) {
      console.error("fail tod delete apartment!!");
      throw error;
    }
  }
}
