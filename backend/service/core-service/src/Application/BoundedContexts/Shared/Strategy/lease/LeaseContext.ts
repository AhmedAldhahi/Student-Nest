import { UserRole } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { AdminLeaseStrategy } from "./AdminLease.strategy";
import { ILeaseStrategy } from "./ILease.strategy";
import { LandlordLeaseStrategy } from "./LandlordLease.strategy";
import { StudentLeaseStrategy } from "./StudentLease.strategy";

export class LeaseContext {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly adminStrategy: AdminLeaseStrategy,
    private readonly landlordStrategy: LandlordLeaseStrategy,
    private readonly studentStrategy: StudentLeaseStrategy
  ) {}

  public async executeFindAllLease(userId: string) {
    try {
      let strategy: ILeaseStrategy;
      const role = await this.GetUserRole(userId);

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

  public async executeFindByQuery(query: string, userId: string) {
    try {
      let strategy: ILeaseStrategy;
      const role = await this.GetUserRole(userId);

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

  private async GetUserRole(userId: string): Promise<UserRole> {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return user.getRole();
    } catch (error: any) {
      console.error("Invalid role", error);
      throw error;
    }
  }
}
