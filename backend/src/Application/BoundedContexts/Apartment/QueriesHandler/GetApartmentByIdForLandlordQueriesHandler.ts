import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetApartmentByIdQueries } from "../Queries/GetApartmentById";

export class GetApartmentByIdForLandlordQueriesHandler
  implements IQueriesHandlers<GetApartmentByIdQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readApartmentRepo: IReadApartmentRepo
  ) {}

  public async handle(command: GetApartmentByIdQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId
      );
      if (!landlord) throw new Error("no landlord been found !!");

      user.ensureAccountIsActive();

      return await this.readApartmentRepo.findApartmentDetailsByIdForLandlord(
        command.id,
        command.userId
      );
    } catch (error: any) {
      console.error("fail to get apartments !!");
      throw error;
    }
  }
}
