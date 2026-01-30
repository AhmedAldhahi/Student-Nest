import { UserRole } from "../../../../../Domain/Shared/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { AdminLeaseRequestStrategy } from "./AdminLeaseRequest.strategy";
import { ILeaseRequestStrategy } from "./ILeaseRequest.strategy";
import { LandlordLeaseRequestStrategy } from "./LandlordLeaseRequest.strategy";
import { StudentLeaseRequestStrategy } from "./StudentLeaseRequest.strategy";

export class LeaseRequestContext {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly adminStrategy: AdminLeaseRequestStrategy,
    private readonly landlordStrategy: LandlordLeaseRequestStrategy,
    private readonly studentStrategy: StudentLeaseRequestStrategy
  ) {}

  public async executeGetAllLeaseRequest(userId: string) {
    let strategy: ILeaseRequestStrategy;
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
        throw new Error("invalid role !!");
    }

    return await strategy.findAllLeaseRequest(userId);
  }

  public async executeSearchLeaseRequest(userId: string, queries: string) {
    try {
      let strategy: ILeaseRequestStrategy;
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
          throw new Error("invalid role!!");
      }

      return await strategy.findLeaseRequestByQuery(userId, queries);
    } catch (error: any) {
      console.error("fail to get leases request !!");
      throw error;
    }
  }

  private async GetUserRole(userId: string): Promise<UserRole> {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");
      return user.getRole();
    } catch (error: any) {
      console.error("invalid role !!", error);
      throw error;
    }
  }
}
