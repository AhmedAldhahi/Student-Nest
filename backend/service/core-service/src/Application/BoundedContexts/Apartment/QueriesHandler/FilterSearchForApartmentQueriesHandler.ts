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

      if (command.price && command.price.length === 2) {
        if (command.price[0]) filter.minPrice = command.price[0];
        if (command.price[1]) filter.maxPrice = command.price[1];
      }

      if (command.age && command.age.length === 2) {
        if (command.age[0]) filter.minAge = command.age[0];
        if (command.age[1]) filter.maxAge = command.age[1];
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
