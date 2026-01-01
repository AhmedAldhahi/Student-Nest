import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { AdminLeaseRequestStrategy } from "./AdminLeaseRequest.strategy";
import { ILeaseRequestStrategy } from "./IleaseRequest.strategy";
import { LandlordLeaseRequestStrategy } from "./LandlordLeaseRequest.strategy";
import { StudentLeaseRequestStrategy } from "./StudentLeaseRequest.strategy";

export class LeaseRequestContext {
  constructor(
    private readonly adminStrategy: AdminLeaseRequestStrategy,
    private readonly landlordStrategy: LandlordLeaseRequestStrategy,
    private readonly studentStrategy: StudentLeaseRequestStrategy
  ) {}

  public async executeGetAllLeaseRequest(userId: string, role: UserRole) {
    let strategy: ILeaseRequestStrategy;

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

  public async executeSearchLeaseRequest(
    userId: string,
    role: UserRole,
    queries: string
  ) {
    try {
      let strategy: ILeaseRequestStrategy;

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
}
