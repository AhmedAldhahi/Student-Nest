import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllApartmentBeenBookedQueries } from "../../../Queries/Apartment/GetAllApartmentBeenBooked";

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

      return await this.readApartmentRepo.findAllApartmentBasedArray(
        uniqueApartmentIds,
        command.userId
      );
    } catch (error: any) {
      console.error("Fail to get booked apartments", error);
      throw error;
    }
  }
}
