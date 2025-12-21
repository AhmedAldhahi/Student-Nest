import { ILeaseEntityDTO } from "../../../Application/Dtos/admin/LeaseDTO.dtos";
import { IReadLeaseRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LeaseModel } from "../../Database/orm/TypeOrm/entity/Lease.entity";

export class ReadLeaseRepositories implements IReadLeaseRepositories {
  public async findById(id: number): Promise<ILeaseEntityDTO | null> {
    try {
      const orm = await AppDataSource.getInstance()
        .getRepository(LeaseModel)
        .findOne({
          where: { leaseId: id },
          relations: {
            student: { user: true },
            landlord: { user: true },
          },
        });

      if (!orm) return null;

      // FIX: Map manually. Do NOT use LeaseMapper.toResponse(orm) here
      // if you haven't fixed the mapper file itself.
      return {
        leaseId: orm.leaseId,
        LeaseActivationStatus: (orm.LeaseActivationStatus),
        isLandlordSigned: orm.isLandlordSigned,
        isStudentSigned: orm.isStudentSigned,
        houseRule: orm.houseRule,
        leaseStartDate: String(orm.leaseStartDate),
        leaseEndDate: String(orm.leaseEndDate),
        monthlyRent: orm.monthlyRent,
        leaseTerm: orm.leaseTerm,

        // Handle null vs undefined
        includeUtilities: orm.includeUtilities ?? undefined,

        createAt: orm.createAt,

        // Safe access (returns "Unknown" instead of crashing if user is missing)
        landlordName: orm.landlord?.user?.Name || "Unknown",
        studentName: orm.student?.user?.Name || "Unknown",
      };
    } catch (error: any) {
      // Log the real error
      console.error("Error finding lease by ID:", error);
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
          },
          relations: {
            student: { user: true },
            landlord: { user: true },
          },
        });

      if (!leasesModel || leasesModel.length === 0) return [];

      return leasesModel.map((orm) => {
        return {
          leaseId: orm.leaseId,
          LeaseActivationStatus: orm.LeaseActivationStatus,
          isLandlordSigned: orm.isLandlordSigned,
          isStudentSigned: orm.isStudentSigned,
          houseRule: orm.houseRule,
          leaseStartDate: String(orm.leaseStartDate),
          leaseEndDate: String(orm.leaseEndDate),
          monthlyRent: orm.monthlyRent,
          leaseTerm: orm.leaseTerm,
          includeUtilities: orm.includeUtilities ?? undefined,
          createAt: orm.createAt,

          // Safe access: If student/landlord is missing, it falls back to "Unknown"
          // instead of crashing the application.
          landlordName: orm.landlord?.user?.Name || "Unknown",
          studentName: orm.student?.user?.Name || "Unknown",
        };
      });
    } catch (error: any) {
      console.error("fail to get all lease", error);
      throw error;
    }
  }
}
