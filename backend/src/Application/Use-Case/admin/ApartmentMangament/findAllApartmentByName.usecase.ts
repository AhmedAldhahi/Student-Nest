import { GetAllApartmentByTitleQueriesHandler } from "../../../Queries/Handlers/GetAllApartmentByName.QueriesHandler";
import { GetAllApartmentByTitleQueries } from "../../../Queries/Queries/GetApartmentByName";

export class FindAllApartmentByTitleUseCase {
  constructor(
    private readonly queriesHandler: GetAllApartmentByTitleQueriesHandler
  ) {}

  public async execute(name: string) {
    try {
      const Queries = new GetAllApartmentByTitleQueries(name);
      return await this.queriesHandler.handle(Queries);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
