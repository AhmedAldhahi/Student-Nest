import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { ApartmentUtils } from "../../../../Shared/utils/apartmentUtil.util";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllApartmentByQueriesQueries } from "../Queries/GetApartmentByQueries";

export class GetAllApartmentByQueryForAdminQueriesHandler
  implements IQueriesHandlers<GetAllApartmentByQueriesQueries>
{
  constructor(
    private readonly ReadApartmentRepo: IReadApartmentRepo,
    private readonly ReadLeaseRepo: IReadLeaseRepositories 
  ) {}

  public async handle(command: GetAllApartmentByQueriesQueries): Promise<any> {
    try {
      const rawApartments = await this.ReadApartmentRepo.findApartmentByQuery(
        command.name,
        command.userId
      ) || [];

      const leaseCounts = await this.ReadLeaseRepo.getAllActiveLeasesCounts();

      const apartmentsWithCounts = rawApartments.map((apt) => {
        const countData = leaseCounts.find(
          (c) => c.apartmentId === apt.apartmentId
        );

        return {
          ...apt,
          activeLeasesCount: countData ? countData.activeCount : 0,
        };
      });

      const processedApartments = ApartmentUtils.processApartmentStatus(
        apartmentsWithCounts
      );

      return processedApartments;

    } catch (error: any) {
      console.error("fail to get apartments by query !!", error);
      throw error;
    }
  }
}