import { FindOptionsWhere, Like, TreeLevelColumn } from "typeorm";
import { IReadLeaseRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LeaseModel } from "../../Database/orm/TypeOrm/entity/Lease.entity";
import { LeaseMapper } from "../mapper/lease.mapper";
import { ILeaseEntityDTO } from "../../../Application/DTO/admin/LeaseDTO.dto";

export class ReadLeaseRepositories implements IReadLeaseRepositories {
  public async findByQuery(Queries: string): Promise<ILeaseEntityDTO[] | null> {
    try {
      const query = Queries.trim();
      const numericId = Number(query);

      const isNumeric = !Number.isNaN(numericId);

      let whereCondition: FindOptionsWhere<LeaseModel>[];

      if (isNumeric) {
        whereCondition = [{ leaseId: numericId }];
      } else {
        whereCondition = [
          { landlord: { user: { Name: Like(`%${query}%`) } } },

          { student: { user: { Name: Like(`%${query}%`) } } },

          { apartment: { title: Like(`%${query}%`) } },
        ];
      }

      const leasesModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .find({
          where: whereCondition,
          select: {
            leaseId: true,
            LeaseActivationStatus: true,
            isLandlordSigned: true,
            isStudentSigned: true,
            houseRule: true,
            leaseStartDate: true,
            leaseEndDate: true,
            monthlyRent: true,
            leaseTerm: true,
            includeUtilities: true,
            createAt: true,
            landlord: {
              userId: true,
              user: {
                Name: true,
              },
            },
            student: {
              userId: true,

              user: {
                Name: true,
              },
            },

            apartment: {
              apartmentId: true,
              title: true,
            },
          },
          relations: {
            student: { user: true },
            landlord: { user: true },
            apartment: true,
          },
        });

      if (!leasesModel) return [];

      if (!leasesModel || leasesModel.length === 0) return [];

      return leasesModel.map((orm) => {
        return LeaseMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to get all lease", error);
      throw error;
    }
  }

  // findAll uses 'select' for performance, so we MUST map manually to avoid validation errors.
  public async findAll(): Promise<ILeaseEntityDTO[] | null> {
    try {
      const leasesModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .find({
          select: {
            leaseId: true,
            LeaseActivationStatus: true,
            isLandlordSigned: true,
            isStudentSigned: true,
            houseRule: true,
            leaseStartDate: true,
            leaseEndDate: true,
            monthlyRent: true,
            leaseTerm: true,
            includeUtilities: true,
            createAt: true,
            landlord: {
              userId: true,
              user: {
                Name: true,
              },
            },
            student: {
              userId: true,

              user: {
                Name: true,
              },
            },

            apartment: {
              apartmentId: true,
              title: true,
            },
          },
          relations: {
            student: { user: true },
            landlord: { user: true },
            apartment: true,
          },
        });

      if (!leasesModel || leasesModel.length === 0) return [];

      return leasesModel.map((orm) => {
        return LeaseMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to get all lease", error);
      throw error;
    }
  }
}
