import { GetAllApartmentByNameQueriesHandler } from "../../../Querie/Handlers/GetAllApartmentByName.QueriesHandler";
import { GetAllApartmentByNameQueries } from "../../../Querie/Queries/GetApartmentByName";

export class FindAllApartmentByNameUseCase {
  constructor(
    private readonly queriesHandler: GetAllApartmentByNameQueriesHandler
  ) {}

  public async execute(name: string) {
    try {
      const Queries = new GetAllApartmentByNameQueries(name);
      return await this.queriesHandler.handle(Queries);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
