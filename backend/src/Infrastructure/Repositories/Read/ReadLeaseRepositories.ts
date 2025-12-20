import { ILeaseEntityDTO } from "../../../Application/Dtos/admin/LeaseDTO.dtos";
import { IReadLeaseRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LeaseModel } from "../../Database/orm/TypeOrm/entity/Lease.entity";
import { LeaseMapper } from "../mapper/lease.mapper";

export class ReadLeaseRepositories implements IReadLeaseRepositories {
  public async findById(id: number): Promise<ILeaseEntityDTO | null> {
    try {
      const lease = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .findOne({
          where: { leaseId: id },
          relations: {
            student: { user: true },
            landlord: { user: true },
          },
        });
      return lease ? LeaseMapper.toResponse(lease) : null;
    } catch (error: any) {
      console.error("Error finding lease by ID:", error);
      throw new Error("Error retrieving lease data");
    }
  }

  public async findAll(): Promise<ILeaseEntityDTO[] | null> {
    try {
      const leasesModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .find({
          // Simplified: Removed the complex 'select' that was breaking the relation hydration
          relations: {
            student: { user: true },
            landlord: { user: true },
          },
        });

      if (!leasesModel || leasesModel.length === 0) return [];

      return leasesModel.map((orm) => {
        // LeaseMapper.toEntity internally calls Student/Landlord mappers
        // IF the relations were loaded correctly above.
        const leaseEntity = LeaseMapper.toEntity(orm);

        return {
          leaseId: leaseEntity.getLeaseId(),
          LeaseActivationStatus: leaseEntity.getActivated(),
          isLandlordSigned: leaseEntity.getIsLandlordSigned(),
          isStudentSigned: leaseEntity.getIsStudentSigned(),
          houseRule: leaseEntity.getHouseRule(),
          leaseStartDate: leaseEntity.getLeaseStartDate(),
          leaseEndDate: leaseEntity.getLeaseEndDate(),
          monthlyRent: leaseEntity.getMonthlyRent(),
          leaseTerm: leaseEntity.getLeaseTerm(),
          includeUtilities: leaseEntity.getIncludeUtilities(),
          createAt: leaseEntity.getCreateAt(),
          // Accessing the names through the Aggregate Roots
          landlordName: leaseEntity.getLandlord().getUser().getName(),
          studentName: leaseEntity.getStudent().getUser().getName(),
        };
      });
    } catch (error: any) {
      console.error("fail to get all lease", error);
      throw error;
    }
  }
}
