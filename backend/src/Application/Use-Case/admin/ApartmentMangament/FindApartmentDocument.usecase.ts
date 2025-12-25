import { GetApartmentDocumentByIdQueriesHandler } from "../../../Queries/Handlers/GetApartmentDocumentById.QueriesHandler";
import { GetDocumentOfApartmentByIdQueries } from "../../../Queries/Queries/GetDocumentOfApartmntByIdQueries";

export class findApartmentDocumentByIdUseCase {
  constructor(
    private readonly queriesHandler: GetApartmentDocumentByIdQueriesHandler
  ) {}

  public async execute(id: number) {
    try {
      const command = new GetDocumentOfApartmentByIdQueries(id);
      return await this.queriesHandler.handle(command);
    } catch (error: any) {
      console.error("fail to get all apartment document !!");
      throw error;
    }
  }
}
