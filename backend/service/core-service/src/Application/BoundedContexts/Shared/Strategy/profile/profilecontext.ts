import { UserRole } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { AdminProfileStrategy } from "./AdminProfile.strategy";
import { IProfileStrategy } from "./IProfileStrategy.strategy";
import { LandlordProfileStrategy } from "./LandlordProfile.strategy";
import { StudentProfileStrategy } from "./StudentProfile.strategy";

export class ProfileContext {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private adminStrategy: AdminProfileStrategy,
    private landlordStrategy: LandlordProfileStrategy,
    private studentStrategy: StudentProfileStrategy
  ) {}

  public async executeStrategy(userId: string): Promise<any> {
    let strategy: IProfileStrategy;

    const role = await this.getUserRole(userId);

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

  public async executeUpdateStrategy(userId: string, dto: any): Promise<any> {
    let strategy: IProfileStrategy;
    const role = await this.getUserRole(userId);

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

  private async getUserRole(userId: string): Promise<UserRole> {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return user.getRole();
    } catch (error: any) {
      console.error("no role been found !!", error);
      throw error;
    }
  }
}
