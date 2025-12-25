import { GetAllApartmentQueriesHandler } from "../../../Queries/Handlers/GetAllApartmentQueriesHandler";

export class findAllApartmentUseCase {
  constructor(private readonly queriesHandler: GetAllApartmentQueriesHandler) {}

  public async execute() {
    try {
      return await this.queriesHandler.handle();
    } catch (error: any) {
      console.error("fail to get all apartments !!");
      throw error;
    }
  }
}
