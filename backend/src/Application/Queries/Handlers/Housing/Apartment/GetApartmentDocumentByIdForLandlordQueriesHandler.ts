import { IReadApartmentDocumentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentDocument.repositories";
import { IReadLandlordRepositories } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetDocumentOfApartmentByIdQueries } from "../../../Queries/Apartment/GetDocumentOfApartmntByIdQueries";

export class GetApartmentDocumentByIdForLandlordQueriersHandler
  implements IQueriesHandlers<GetDocumentOfApartmentByIdQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readApartmentDocumentRepo: IReadApartmentDocumentRepo
  ) {}

  public async handle(
    command: GetDocumentOfApartmentByIdQueries
  ): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);

      if (!user) throw new Error("no user been found !!");

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId
      );

      if (!landlord) throw new Error("no landlord been found !!");

      user.ensureAccountIsActive();

      return await this.readApartmentDocumentRepo.findApartmentDocumentByIdForLandlord(
        command.apartmentDocumentId,
        command.userId
      );
    } catch (error: any) {
      console.error("fail to get apartment documents !!");
      throw error;
    }
  }
}
