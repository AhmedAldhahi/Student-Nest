import { IReadApartmentDocumentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentDocument.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetDocumentOfApartmentByIdQueries } from "../../../Queries/Apartment/GetDocumentOfApartmntByIdQueries";
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
      return await this.ReadApartmentDocument.findApartmentDocumentById(
        command.apartmentDocumentId,
        command.userId
      );
    } catch (error: any) {
      console.error("fail to get apartment document by id !!");
      throw error;
    }
  }
}
