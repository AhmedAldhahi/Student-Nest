import { CreateApartmentCommand } from "../../../Command/Commands/Apartment/CreateApartmentCommand";
import { CreateApartmentCommandHandler } from "../../../Command/Handlers/Housing/Apartment/CreateApartmentCommandHandler";
import { ApartmentDataRequest } from "../../../DTO/landlord/addNewApartmentRequest.dto";

export class CreateApartmentUseCase {
  constructor(private readonly commandHandler: CreateApartmentCommandHandler) {}

  public async execute(dto: ApartmentDataRequest) {
    try {
      const command = new CreateApartmentCommand(dto);
      return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to create apartment !!");
      throw error;
    }
  }
}
