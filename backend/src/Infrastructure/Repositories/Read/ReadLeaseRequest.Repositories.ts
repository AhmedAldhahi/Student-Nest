import { ILeaseRequestDTO } from "../../../Application/Dtos/admin/LeaseRequestDTO.dtos";
import { IReadLeaseRequestRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";
import { LeaseRequestMapper } from "../mapper/leaseRequest.mapper";

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

  public async findLeaseRequestById(
    id: number
  ): Promise<ILeaseRequestDTO | null> {
    try {
      const orm = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .findOne({
          where: { leaseRequestId: id },
          relations: {
            student: { user: true },
            landlord: { user: true },
            apartment: true,
          },
        });

      if (!orm) return null;
      return LeaseRequestMapper.toResponse(orm);
    } catch (error: any) {
      console.error("fail to get lease request by id");
      throw error;
    }
  }
}
