import { Like, FindOptionsWhere } from "typeorm";
import { LeaseRequestEntity } from "../../../Domain/BoundedContexts/Leases/Entities/leaseRequestEntity.entity";
import { IReadLeaseRequestRepositories } from "../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { LeaseRequestModel } from "../../Database/TypeOrm/entity/LeaseRequest";
import { LeaseRequestMapper } from "../mapper/leaseRequest.mapper";
import { ILeaseRequestDTO } from "../../../Domain/BoundedContexts/Leases/Representations/ILeaseRequestDTO";

export class ReadLeaseRequestRepositories implements IReadLeaseRequestRepositories {
  public async findLeaseRequestForApartment(
    leaseRequestId: string,
  ): Promise<LeaseRequestEntity | null> {
    const leaseRequest = await AppDataSource.getInstance()
      .getRepository(LeaseRequestModel)
      .findOne({
        where: { leaseRequestId: leaseRequestId },
        relations: { student: true, landlord: true },
      });

    if (!leaseRequest) return null;
    return LeaseRequestMapper.toEntity(leaseRequest);
  }
  public async findAllLeaseRequestForStudent(
    userId: string,
  ): Promise<ILeaseRequestDTO[] | null> {
    try {
      const leaseRequest = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .find({
          where: { studentId: userId },
          select: {
            leaseRequestId: true,
            requestMessage: true,
            startDate: true,
            rentTerm: true,
            requestStatus: true,
            createAt: true,
            landlordId:true,
            studentId:true,
            apartmentId:true,

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

  public async SearchForLeaseRequestForStudent(
    userId: string,
    queries: string,
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
          student: { userId: userId },
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

  public async findAllLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string,
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
        error,
      );
      throw error;
    }
  }

  public async SearchForLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string,
    queries: string,
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
        error,
      );
      throw error;
    }
  }

  public async findLeaseRequestByIdForLandlord(
    userId: string,
    id: string,
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
        error,
      );
      throw error;
    }
  }

  public async findAllLeaseRequestForLandlord(
    userId: string,
  ): Promise<ILeaseRequestDTO[] | null> {
    try {
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
    } catch (error: any) {
      console.error("Error fetching lease requests:", error);
      throw error;
    }
  }
  public async SearchForLeaseRequestForLandlord(
    userId: string,
    queries: string,
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
    Queries: string,
  ): Promise<ILeaseRequestDTO[]> {
    try {
      const query = Queries.trim();

      // 1. Define the raw string pattern only (e.g. "%John%")
      const pattern = `%${query}%`;

      let whereCondition: FindOptionsWhere<LeaseRequestModel>[];

      // 2. Use Like(pattern) cleanly for each field
      whereCondition = [
        // Search ID
        { leaseRequestId: Like(pattern) },

        // Search in Landlord Name (Nested Relation)
        { landlord: { user: { Name: Like(pattern) } } },

        // Search in Student Name (Nested Relation)
        { student: { user: { Name: Like(pattern) } } },

        // Search in Apartment Title
        { apartment: { title: Like(pattern) } },
      ];

      const leaseRequests = await AppDataSource.getInstance()
        .getRepository(LeaseRequestModel)
        .find({
          where: whereCondition, // Acts as OR logic
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
