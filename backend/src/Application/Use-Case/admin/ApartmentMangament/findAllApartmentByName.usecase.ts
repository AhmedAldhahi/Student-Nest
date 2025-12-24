import { GetAllApartmentByTitleQueriesHandler } from "../../../Querie/Handlers/GetAllApartmentByName.QueriesHandler";
import { GetAllApartmentByTitleQueries } from "../../../Querie/Queries/GetApartmentByName";

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
