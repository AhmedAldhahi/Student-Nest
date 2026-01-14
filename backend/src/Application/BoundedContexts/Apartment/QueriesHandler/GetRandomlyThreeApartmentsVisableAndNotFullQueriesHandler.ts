import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IApartmentSimpleDTO } from "../../../../Domain/BoundedContexts/Housing/Representations/IApartmentSimpleDto";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
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
        await this.readApartmentRepo.FindAllApartmentThatBeenVerified();

      if (!verifiedApartments || verifiedApartments.length === 0) return [];

      const availableApartments: IApartmentSimpleDTO[] = [];

      for (const apt of verifiedApartments) {
        if (!apt.isVisible) continue;

        const activeLeasesCount =
          await this.readLeaseRepo.countActiveLeasesByApartmentId(
            apt.apartmentId
          );

        const capacity = parseInt(apt.numberOfRoom || "0");

        if (activeLeasesCount < capacity) {
          availableApartments.push(apt);
        }
      }

      return availableApartments.sort(() => Math.random() - 0.5).slice(0, 3);
    } catch (error: any) {
      throw new Error(`Failed to fetch featured apartments: ${error.message}`);
    }
  }
}
