import { ILeaseRequestDTO } from "../../../Application/Dtos/admin/LeaseRequestDTO.dtos";
import { IReadLeaseRequestRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";
import { LandlordMapper } from "../mapper/landloard.mapper";
import { LeaseMapper } from "../mapper/lease.mapper";
import { LeaseRequestMapper } from "../mapper/leaseRequest.mapper";
import { StudentMapper } from "../mapper/student.mapper";

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
              },
            },
          },
          relations: {
            student: { user: true },
            landlord: { user: true },
          },
        });

      if (!leaseRequest || leaseRequest.length === 0) return [];

      return leaseRequest.map((orm) => {
        return {
          requestLeaseId: orm.leaseRequestId,
          requestMessage: orm.requestMessage,
          startDate: orm.startDate,

          rentTerm: orm.rentTerm,
          requestStatus: orm.requestStatus,

          createAt: orm.createAt,
          studentName: orm.student.user.Name,
          landlordName: orm.landlord.user.Name,
          Major: orm.student.Major,
        };
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
          },
        });

      if (!orm) return null;
      return {
        requestLeaseId: orm.leaseRequestId,
        requestMessage: orm.requestMessage,
        startDate: orm.startDate,

        rentTerm: orm.rentTerm,
        requestStatus: orm.requestStatus,

        createAt: orm.createAt,
        studentName: orm.student.user.Name,
        landlordName: orm.landlord.user.Name,
        Major: orm.student.Major,
      };
    } catch (error: any) {
      console.error("fail to get lease request by id");
      throw error;
    }
  }
}
