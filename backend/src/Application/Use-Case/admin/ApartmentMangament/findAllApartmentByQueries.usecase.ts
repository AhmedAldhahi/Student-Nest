import { GetAllApartmentByQueryQueriesHandler } from "../../../Queries/Handlers/GetAllApartmentQueries.QueriesHandler";
import { GetAllApartmentByTitleQueries } from "../../../Queries/Queries/GetApartmentByName";

export class FindAllApartmentByQueryUseCase {
  constructor(
    private readonly queriesHandler: GetAllApartmentByQueryQueriesHandler
  ) {}

  public async execute(Query: string) {
    try {
      const Queries = new GetAllApartmentByTitleQueries(Query);
      return await this.queriesHandler.handle(Queries);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
