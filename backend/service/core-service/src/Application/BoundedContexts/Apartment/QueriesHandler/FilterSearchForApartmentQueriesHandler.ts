import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { FilterOptionType } from "../../../../Domain/BoundedContexts/Housing/Types/ApartmentFilterType.type";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { FilterApartmentCommand } from "../Queries/FilterForApartment";

export class FilterSearchForApartmentQueriesHandler implements IQueriesHandlers<FilterApartmentCommand> {
  constructor(private readonly readApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: FilterApartmentCommand): Promise<any> {
    try {
      let filter: FilterOptionType = {};

      if (command.University) filter.University = command.University;

      if (command.isJoin !== undefined) {
        filter.isJoint = command.isJoin;
      }

      if (command.minPrice) {
        filter.minAge = command.minAge;
      }

      if (command.maxAge) {
        filter.maxAge = command.maxAge;
      }

      if (command.minPrice) {
        filter.minPrice = command.minPrice;
      }

      if (command.maxPrice) {
        filter.maxPrice = command.maxPrice;
      }

      return await this.readApartmentRepo.filterApartment(filter);
    } catch (error: any) {
      console.error(
        "Failed to execute FilterSearchForApartmentQueriesHandler",
        error,
      );
      throw error;
    }
  }
}
