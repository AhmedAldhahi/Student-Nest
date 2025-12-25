import { GetApartmentByIdQueriesHandler } from "../../../Queries/Handlers/GetApartmentByIdQueriesHandler";
import { GetApartmentByIdQueries } from "../../../Queries/Queries/GetApartmentById";

export class findApartmentByIdUseCase {
  constructor(
    private readonly findApartmentById: GetApartmentByIdQueriesHandler
  ) {}

  public async execute(id: number) {
    try {
      const command = new GetApartmentByIdQueries(id);
      return await this.findApartmentById.handle(command);
    } catch (error: any) {
      console.error(`fail to get apartment detail with this id : ${id}`);
      throw error;
    }
  }
}
