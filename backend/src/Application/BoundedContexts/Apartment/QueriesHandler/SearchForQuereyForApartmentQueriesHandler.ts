import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { SearchForApartmentByQueries } from "../Queries/SearchApartmentByQuereis";

export class SearchForApartmentQueriesHandler implements IQueriesHandlers<SearchForApartmentByQueries> {
  constructor(private readonly readApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: SearchForApartmentByQueries): Promise<any> {
    try {
      return await this.readApartmentRepo.searchForVisibleApartments(
        command.queries,
      );
    } catch (error: any) {
      console.error("fail to get apartments !!", error);
      throw error;
    }
  }
}
