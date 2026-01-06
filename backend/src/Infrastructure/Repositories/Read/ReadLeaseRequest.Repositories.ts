import { FindOptionsWhere, Like } from "typeorm";
import { ILeaseRequestDTO } from "../../../Application/DTO/admin/LeaseRequestDTO.dto";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";
import { LeaseRequestMapper } from "../mapper/leaseRequest.mapper";
import { IReadLeaseRequestRepositories } from "../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { LeaseRequestEntity } from "../../../Domain/Modules/Leases/Entities/leaseRequestEntity.entity";

export class ReadLeaseRequestRepositories
  implements IReadLeaseRequestRepositories
{
  public async findAllLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string
  ): Promise<ILeaseRequestDTO[] | null> {
    try {
      const leaseRequests = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .find({
          // Filter by BOTH Landlord AND Apartment
          where: {
            landlord: { userId: userId },
            apartment: { apartmentId: apartmentId },
          },
          select: {
            leaseRequestId: true,
            requestMessage: true,
            startDate: true,
            rentTerm: true,
            requestStatus: true,
            createAt: true,
            landlord: {
              userId: true,
              user: { Name: true },
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
          order: {
            createAt: "DESC",
          },
        });

      if (!leaseRequests || leaseRequests.length === 0) return [];

      return leaseRequests.map((orm) => LeaseRequestMapper.toResponse(orm));
    } catch (error: any) {
      console.error(
        "Error fetching lease requests for single apartment:",
        error
      );
      throw error;
    }
  }

  public async SearchForLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string,
    queries: string
  ): Promise<ILeaseRequestDTO[] | null> {
    try {
      const queryCleaned = queries.trim();
      const searchPattern = Like(`%${queryCleaned}%`);

      const whereCondition: FindOptionsWhere<LeaseRequestModel>[] = [
        {
          leaseRequestId: searchPattern,
          landlord: { userId: userId },
          apartment: { apartmentId: apartmentId },
        },
        {
          student: { user: { Name: searchPattern } },
          landlord: { userId: userId },
          apartment: { apartmentId: apartmentId },
        },
        {
          requestMessage: searchPattern,
          landlord: { userId: userId },
          apartment: { apartmentId: apartmentId },
        },
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
              user: { Name: true },
            },
            student: {
              userId: true,
              Major: true,
              user: {
                Name: true,
                userId: true,
                Photo: true,
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
          order: {
            createAt: "DESC",
          },
        });

      if (!leaseRequests || leaseRequests.length === 0) return [];

      return leaseRequests.map((orm) => LeaseRequestMapper.toResponse(orm));
    } catch (error: any) {
      console.error(
        "Error searching lease requests for single apartment:",
        error
      );
      throw error;
    }
  }

  public async findLeaseRequestByIdForLandlord(
    userId: string,
    id: string
  ): Promise<LeaseRequestEntity | null> {
    try {
      const leaseRequest = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .findOne({
          where: {
            leaseRequestId: id,
            landlord: { userId: userId },
          },
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

      if (!leaseRequest) return null;

      return LeaseRequestMapper.toEntity(leaseRequest);
    } catch (error: any) {
      console.error(
        "Error fetching specific lease request for landlord:",
        error
      );
      throw error;
    }
  }

  public async findAllLeaseRequestForLandlord(
    userId: string
  ): Promise<ILeaseRequestDTO[] | null> {
    console.log("user id : ", userId);

    const leaseRequest = await AppDataSource.getInstance()
      .getRepository(LeaseRequestModel)
      .find({
        where: { landlordId: userId },
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
  }
  catch(error: any) {
    console.error("Error fetching lease requests:", error);
    throw error;
  }

  public async SearchForLeaseRequestForLandlord(
    userId: string,
    queries: string
  ): Promise<ILeaseRequestDTO[] | null> {
    try {
      const queryCleaned = queries.trim();
      const searchPattern = Like(`%${queryCleaned}%`);

      // In TypeORM, an Array [] means OR.
      // To do (LandlordID = X) AND (Condition Y), we must put LandlordID in every object.
      const whereCondition: FindOptionsWhere<LeaseRequestModel>[] = [
        // 1. Match Request ID AND specific Landlord
        {
          leaseRequestId: searchPattern,
          landlord: { userId: userId },
        },
        // 2. Match Student Name AND specific Landlord
        {
          student: { user: { Name: searchPattern } },
          landlord: { userId: userId },
        },
        // 3. Match Apartment Title AND specific Landlord
        {
          apartment: { title: searchPattern },
          landlord: { userId: userId },
        },
      ];

      const leaseRequests = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .find({
          where: whereCondition, // <--- Fixed: Passed array directly, removed extra {}
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
              Major: true, // Ensure this exists in your StudentModel
              user: {
                Name: true,
                userId: true,
                Photo: true, // Often helpful for UI
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
            landlord: { user: true }, // Required for the 'where' clause check
            apartment: true,
          },
          order: {
            createAt: "DESC", // Good practice to show newest results first
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
