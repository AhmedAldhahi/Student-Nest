import { FindOptionsWhere, Like } from "typeorm";
import { ILeaseRequestDTO } from "../../../Application/DTO/admin/LeaseRequestDTO.dto";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";
import { LeaseRequestMapper } from "../mapper/leaseRequest.mapper";
import { IReadLeaseRequestRepositories } from "../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";

export class ReadLeaseRequestRepositories
  implements IReadLeaseRequestRepositories
{
  public async findAllLeaseRequest(): Promise<ILeaseRequestDTO[] | null> {
    try {
      const leaseRequest = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .find({
          select: {
            leaseRequestId: true,
            requestMessage: true,
            startDate: true,
            rentTerm: true,
            requestStatus: true,
            createAt: true,

            landlord: {
              userId: true,
              user: {
                Name: true,
              },
            },
            student: {
              userId: true,
              Major: true,
              user: {
                Name: true,
                userId: true,
              },
            },

            apartment: {
              title: true,
              price: true,
              apartmentId: true,
            },
          },
          relations: {
            student: { user: true },
            landlord: { user: true },
            apartment: true,
          },
        });

      if (!leaseRequest || leaseRequest.length === 0) return [];

      return leaseRequest.map((orm) => {
        return LeaseRequestMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("Error fetching lease requests:", error);
      throw error;
    }
  }

  public async findLeaseRequestByQuery(
    Queries: string
  ): Promise<ILeaseRequestDTO[]> {
    try {
      const query = Queries.trim();
      const searchPattern = Like(`%${query}%`);

      let whereCondition: FindOptionsWhere<LeaseRequestModel>[];
      whereCondition = [
        { leaseRequestId: searchPattern },
        // Search in Landlord Name
        { landlord: { user: { Name: Like(`%${query}%`) } } },
        // Search in Student Name
        { student: { user: { Name: Like(`%${query}%`) } } },
        // Search in Apartment Title
        { apartment: { title: Like(`%${query}%`) } },
      ];

      const leaseRequests = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .find({
          where: whereCondition,
          select: {
            leaseRequestId: true,
            requestMessage: true,
            startDate: true,
            rentTerm: true,
            requestStatus: true,
            createAt: true,
            landlord: {
              userId: true,
              user: {
                Name: true,
              },
            },
            student: {
              userId: true,
              Major: true,
              user: {
                Name: true,
                userId: true,
              },
            },
            apartment: {
              title: true,
              price: true,
              apartmentId: true,
            },
          },
          relations: {
            student: { user: true },
            landlord: { user: true },
            apartment: true,
          },
        });

      if (leaseRequests.length === 0) return [];

      return leaseRequests.map((orm) => {
        return LeaseRequestMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to get lease request by query", error);
      throw error;
    }
  }
}
