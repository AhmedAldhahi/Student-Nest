import { Like, FindOptionsWhere } from "typeorm";
import { LeaseAggregateRoot } from "../../../Domain/BoundedContexts/Leases/AgregateRoot/leaseEntity.entity";
import { IReadLeaseRepositories } from "../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { LeaseModel } from "../../Database/TypeOrm/entity/Lease.entity";
import { LeaseMapper } from "../mapper/lease.mapper";
import { ILeaseEntityDTO } from "../../../Domain/BoundedContexts/Leases/Representations/ILeaseEntityDTO";

export class ReadLeaseRepositories implements IReadLeaseRepositories {
  public async findLeaseForStudentById(
    userId: string,
    id: string,
  ): Promise<ILeaseEntityDTO | null> {
    try {
      const leaseModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .findOne({
          where: { studentId: userId, leaseId: id },
          relations: {
            landlord: { user: true },
            student: { user: true },
            apartment: true,
          },
        });

      if (!leaseModel) return null;

      return LeaseMapper.toResponse(leaseModel);
    } catch (error: any) {
      console.error("fail to get leases !!");
      throw error;
    }
  }
  public async findAllLeaseForStudentSearch(
    userId: string,
    query: string,
  ): Promise<ILeaseEntityDTO[] | null> {
    try {
      const Queries = query.trim();
      const searchPattern = Like(`%${Queries}%`);

      const whereCondition: FindOptionsWhere<LeaseModel>[] = [
        {
          studentId: userId,
          student: { user: { Name: searchPattern } },
        },
        {
          landlord: { userId: userId },
          apartment: { title: searchPattern },
        },
        {
          landlord: { userId: userId },
          leaseId: searchPattern,
        },
      ];

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
            apartmentId: true,
            landlord: {
              userId: true,
              user: { Name: true },
            },
            student: {
              userId: true,
              user: { Name: true },
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

      if (leasesModel.length === 0) return [];

      return leasesModel.map((orm) => {
        return LeaseMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to get all lease", error);
      throw error;
    }
  }

  public async findAllLeaseForStudent(
    userId: string,
  ): Promise<ILeaseEntityDTO[] | null> {
    try {
      const leasesModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .find({
          where: { student: { userId: userId } },
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
            apartmentId: true,
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

  public async countActiveLeasesByApartmentId(
    apartmentId: string,
  ): Promise<number> {
    const count = await AppDataSource.getInstance()
      .getRepository(LeaseModel)
      .createQueryBuilder("lease")
      .where("lease.apartmentId = :apartmentId", { apartmentId })
      .andWhere("lease.LeaseActivationStatus = :status", { status: true })
      .getCount();

    return count;
  }

  public async findLeaseForLandlordById(
    userId: string,
    id: string,
  ): Promise<ILeaseEntityDTO | null> {
    try {
      const leaseModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .findOne({
          where: { landlordId: userId, leaseId: id },
          relations: {
            landlord: { user: true },
            student: { user: true },
            apartment: true,
          },
        });

      if (!leaseModel) return null;

      return LeaseMapper.toResponse(leaseModel);
    } catch (error: any) {
      console.error("fail to get leases !!");
      throw error;
    }
  }

  public async findLeaseForLandlordForSingleApartmentById(
    userId: string,
    apartmentId: string,
    leaseId: string,
  ): Promise<LeaseAggregateRoot | null> {
    try {
      const leaseModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .findOne({
          where: {
            landlordId: userId,
            apartmentId: apartmentId,
            leaseId: leaseId,
          },
          relations: {
            landlord: { user: true },
            student: { user: true },
            apartment: true,
          },
        });

      if (!leaseModel) return null;

      return LeaseMapper.toEntity(leaseModel);
    } catch (error: any) {
      console.error("fail to fetch lease !!", error);
      throw error;
    }
  }

  public async findAllLeaseForLandlord(
    userId: string,
  ): Promise<ILeaseEntityDTO[] | null> {
    try {
      const leasesModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .find({
          where: { landlord: { userId: userId } },
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
            apartmentId: true,
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

  public async findAllLeaseForLandlordSearch(
    userId: string,
    query: string,
  ): Promise<ILeaseEntityDTO[] | null> {
    try {
      const Queries = query.trim();
      const searchPattern = Like(`%${Queries}%`);

      const whereCondition: FindOptionsWhere<LeaseModel>[] = [
        {
          landlord: { userId: userId },
          student: { user: { Name: searchPattern } },
        },
        {
          landlord: { userId: userId },
          apartment: { title: searchPattern },
        },
        {
          landlord: { userId: userId },
          leaseId: searchPattern,
        },
      ];

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
            apartmentId: true,
            landlord: {
              userId: true,
              user: { Name: true },
            },
            student: {
              userId: true,
              user: { Name: true },
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

      if (leasesModel.length === 0) return [];

      return leasesModel.map((orm) => {
        return LeaseMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to get all lease", error);
      throw error;
    }
  }

  public async findAllLeaseForLandlordForSingleApartment(
    userId: string,
    apartmentId: string,
  ): Promise<ILeaseEntityDTO[] | null> {
    try {
      const leasesModel = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .find({
          where: {
            // We use explicit columns to be safe
            landlordId: userId,
            apartmentId: apartmentId,
          },
          relations: {
            student: { user: true },
            landlord: { user: true },
            apartment: true,
          },
        });

      if (!leasesModel || leasesModel.length === 0) return [];

      return leasesModel.map((orm) => LeaseMapper.toResponse(orm));
    } catch (error: any) {
      console.error("fail to get leases for single apartment", error);
      throw error;
    }
  }

  public async findAllLeaseForLandlordForSingleApartmentByQueries(
    userId: string,
    apartmentId: string,
    query: string, // Added query parameter here
  ): Promise<ILeaseEntityDTO[] | null> {
    try {
      const Queries = query.trim();
      const searchPattern = Like(`%${Queries}%`);

      // We enforce LandlordID AND ApartmentID on every condition
      const whereCondition: FindOptionsWhere<LeaseModel>[] = [
        // 1. Search by Student Name
        {
          landlord: { userId: userId },
          apartment: { apartmentId: apartmentId },
          student: { user: { Name: searchPattern } },
        },
        // 2. Search by Lease ID
        {
          landlord: { userId: userId },
          apartment: { apartmentId: apartmentId },
          leaseId: searchPattern,
        },
      ];

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
            apartmentId: true,
            landlord: {
              userId: true,
              user: { Name: true },
            },
            student: {
              userId: true,
              user: { Name: true },
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

      return leasesModel.map((orm) => LeaseMapper.toResponse(orm));
    } catch (error: any) {
      console.error("fail to search leases for single apartment", error);
      throw error;
    }
  }

  public async findByQuery(Queries: string): Promise<ILeaseEntityDTO[] | null> {
    try {
      const query = Queries.trim();
      const searchPattern = Like(`%${query}%`);

      const whereCondition: FindOptionsWhere<LeaseModel>[] = [
        { leaseId: searchPattern }, // Matches ID as a string
        { landlord: { user: { Name: searchPattern } } },
        { student: { user: { Name: searchPattern } } },
        { apartment: { title: searchPattern } },
      ];

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
            apartmentId: true,
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
            apartmentId: true,
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
}
