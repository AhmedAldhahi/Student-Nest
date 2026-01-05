import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { AdminLeaseStrategy } from "./AdminLease.strategy";
import { ILeaseStrategy } from "./ILease.strategy";
import { LandlordLeaseStrategy } from "./LandlordLease.strategy";
import { StudentLeaseStrategy } from "./StudentLease.strategy";

export class LeaseContext {
  constructor(
    private readonly adminStrategy: AdminLeaseStrategy,
    private readonly landlordStrategy: LandlordLeaseStrategy,
    private readonly studentStrategy: StudentLeaseStrategy
  ) {}

  public async executeFindAllLease(userId: string, role: UserRole) {
    try {
      let strategy: ILeaseStrategy;
      switch (role) {
        case UserRole.admin:
          strategy = this.adminStrategy;
          break;

        case UserRole.landlord:
          strategy = this.landlordStrategy;
          break;

        case UserRole.student:
          strategy = this.studentStrategy;
          break;

        default:
          throw new Error("Invalid role !!");
      }

      return await strategy.FindAllLeases(userId);
    } catch (error: any) {
      console.error("fail to get all leases !!");
      throw error;
    }
  }

  public async executeFindByQuery(
    query: string,
    userId: string,
    role: UserRole
  ) {
    try {
      let strategy: ILeaseStrategy;

      switch (role) {
        case UserRole.admin:
          strategy = this.adminStrategy;
          break;

        case UserRole.landlord:
          strategy = this.landlordStrategy;
          break;

        case UserRole.student:
          strategy = this.studentStrategy;
          break;

        default:
          throw new Error("Invalid role !!");
      }

      return await strategy.SearchForLeases(query, userId);
    } catch (error: any) {
      console.error("fail to search all leases !!");
      throw error;
    }
  }
}
