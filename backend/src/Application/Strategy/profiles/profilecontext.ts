import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { AdminProfileStrategy } from "./AdminProfile.strategy";
import { IProfileStrategy } from "./IprofileStrategy.strategy";
import { LandlordProfileStrategy } from "./LandlordProfile.strategy";
import { StudentProfileStrategy } from "./StudentProfile.strategy";

export class ProfileContext {
  constructor(
    private adminStrategy: AdminProfileStrategy,
    private landlordStrategy: LandlordProfileStrategy,
    private studentStrategy: StudentProfileStrategy
  ) {}

  public async executeStrategy(role: UserRole, userId: string): Promise<any> {
    let strategy: IProfileStrategy;

    // 1. Decide which strategy to use
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
        throw new Error("Invalid User Role");
    }

    // 2. Execute it
    return await strategy.UserProfile(userId);
  }

  public async executeUpdateStrategy(
    role: UserRole,
    userId: string,
    dto: any
  ): Promise<any> {
    let strategy: IProfileStrategy;

    // 1. Decide which strategy to use
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
        throw new Error("Invalid User Role");
    }

    // 2. Execute it
    return await strategy.UpdateUserProfile(userId, dto);
  }
}

//  strategy admin, landlord, student
