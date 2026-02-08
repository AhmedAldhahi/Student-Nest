import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllApartmentBeenBookedQueries } from "../Queries/GetAllApartmentBeenBooked";

export class GetAllApartmentThatBeenBookedQueriesHandler
  implements IQueriesHandlers<GetAllApartmentBeenBookedQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly readLeaseRepo: IReadLeaseRepositories
  ) {}

  public async handle(command: GetAllApartmentBeenBookedQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");
      user.ensureAccountIsActive();

      const leases = await this.readLeaseRepo.findAllLeaseForLandlord(
        command.userId
      );

      if (!leases || leases.length === 0) {
        return [];
      }

      const uniqueApartmentIds = [
        ...new Set(leases.map((lease) => lease.apartmentId)),
      ];

      const apartments = await this.readApartmentRepo.findAllApartmentBasedArray(
        uniqueApartmentIds,
        command.userId
      );

      if (!apartments || apartments.length === 0) {
        return [];
      }

      return apartments.filter((apt) => apt.isVerified === true);

    } catch (error: any) {
      console.error("Fail to get booked apartments", error);
      throw error;
    }
  }
}