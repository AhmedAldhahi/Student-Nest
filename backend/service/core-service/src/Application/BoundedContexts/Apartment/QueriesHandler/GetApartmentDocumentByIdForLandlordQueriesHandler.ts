import { IReadApartmentDocumentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentDocument.repositories";
import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetDocumentOfApartmentByIdQueries } from "../Queries/GetDocumentOfApartmntByIdQueries";

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
