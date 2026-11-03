import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { ApartmentUtils } from "../../../../Shared/utils/apartmentUtil.util";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllApartmentForLandlord } from "../Queries/GetAllApartmemtForLandlord";

export class GetAllApartmentByLandlordQueriesHandler implements IQueriesHandlers<GetAllApartmentForLandlord> {
  constructor(
    private readonly ReadApartmentRepo: IReadApartmentRepo,
    private readonly ReadLeaseRepo: IReadLeaseRepositories,
  ) {}

  public async handle(command: GetAllApartmentForLandlord): Promise<any> {
    try {
      const rawApartments =
        (await this.ReadApartmentRepo.findAllApartmentForLandlord(
          command.userId,
        )) || [];

      const leaseCounts = await this.ReadLeaseRepo.getAllActiveLeasesCounts();

      const apartmentsWithCounts = rawApartments.map((apt) => {
        const countData = leaseCounts.find(
          (c) => c.apartmentId === apt.apartmentId,
        );

        return {
          ...apt,
          activeLeasesCount: countData ? countData.activeCount : 0,
        };
      });

      const processedApartments =
        ApartmentUtils.processApartmentStatus(apartmentsWithCounts);

      return processedApartments;
    } catch (error: any) {
      console.error("fail to get apartments for landlord !!", error);
      throw error;
    }
  }
}
