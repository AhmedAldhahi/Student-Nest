import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IApartmentSimpleDTO } from "../../../../Domain/BoundedContexts/Housing/Representations/IApartmentSimpleDto";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { ApartmentUtils } from "../../../../Shared/utils/apartmentUtil.util";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { ApartmentBased } from "../Queries/ApartmentBases";

export class GetRandomlyThreeApartmentThatIsVisibleAndNotFullQueriesHandler
  implements IQueriesHandlers<ApartmentBased>
{
  constructor(
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly readLeaseRepo: IReadLeaseRepositories
  ) {}

  public async handle(): Promise<IApartmentSimpleDTO[]> {
    try {
      const verifiedApartments =
        await this.readApartmentRepo.FindAllApartmentThatBeenVerified() || [];

      if (verifiedApartments.length === 0) return [];

      const leaseCounts = await this.readLeaseRepo.getAllActiveLeasesCounts();

      const apartmentsWithCounts = verifiedApartments.map((apt) => {
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

      const availableApartments = processedApartments.filter(
        (apt) => apt.isVisible
      );

      return availableApartments
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    } catch (error: any) {
      console.error(`Failed to fetch random apartments: ${error.message}`);
      throw new Error(`Failed to fetch featured apartments`);
    }
  }
}