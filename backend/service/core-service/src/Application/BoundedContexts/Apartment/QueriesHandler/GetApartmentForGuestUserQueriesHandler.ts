import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { ApartmentUtils } from "../../../../Shared/utils/apartmentUtil.util";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetApartmentDetailForGuestQueries } from "../Queries/GetAllApartmentForGuest";

export class GetApartmentByIdForGuestQueriesHandler
  implements IQueriesHandlers<GetApartmentDetailForGuestQueries>
{
  constructor(
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly readLeaseRepo: IReadLeaseRepositories 
  ) {}

  public async handle(
    command: GetApartmentDetailForGuestQueries
  ): Promise<any> {
    try {
      const apartment =
        await this.readApartmentRepo.findApartmentDetailsForGuestById(
          command.id
        );

      if (!apartment) return null;

      const activeCount =
        await this.readLeaseRepo.countActiveLeasesByApartmentId(command.id);

      const apartmentWithCount = {
        ...apartment,
        activeLeasesCount: activeCount,
      };

      const processedList = ApartmentUtils.processApartmentStatus([
        apartmentWithCount,
      ]);

      return processedList[0];
      
    } catch (error: any) {
      console.error("fail to get apartment details for guest !!", error);
      throw error;
    }
  }
}