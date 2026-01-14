import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import {GetApartmentByIdQueries} from "../Queries/GetApartmentById"
export class GetApartmentByIdQueriesHandler
  implements IQueriesHandlers<GetApartmentByIdQueries>
{
  constructor(private readonly readApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetApartmentByIdQueries): Promise<any> {
    try {
      return await this.readApartmentRepo.findApartmentDetailsById(command.id);
    } catch (error: any) {
      console.error("fail to get apartment details !!");
      throw error;
    }
  }
}
