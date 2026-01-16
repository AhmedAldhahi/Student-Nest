import { IReadApartmentDocumentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentDocument.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetDocumentOfApartmentByIdQueries } from "../Queries/GetDocumentOfApartmntByIdQueries";
export class GetApartmentDocumentByIdQueriesHandler
  implements IQueriesHandlers<GetDocumentOfApartmentByIdQueries>
{
  constructor(
    private readonly ReadApartmentDocument: IReadApartmentDocumentRepo
  ) {}

  public async handle(
    command: GetDocumentOfApartmentByIdQueries
  ): Promise<any> {
    try {
      const result = await this.ReadApartmentDocument.findApartmentDocumentById(
        command.apartmentDocumentId,
        command.userId
      );

      if (!result) throw new Error("no apartment document been found !!");
      else return result;
    } catch (error: any) {
      console.error("fail to get apartment document by id !!");
      throw error;
    }
  }
}
