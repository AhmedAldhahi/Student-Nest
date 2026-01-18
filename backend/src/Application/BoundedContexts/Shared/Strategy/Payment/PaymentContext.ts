import { UserRole } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IPaymentStrategy } from "./IPayment.strategy";
import { LandlordPaymentStrategy } from "./LandlordPayment.strategy";
import { StudentPaymentStrategy } from "./StudentPayment.strategy";

export class PaymentContext {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly LandlordStrategy: LandlordPaymentStrategy,
    private readonly StudentStrategy: StudentPaymentStrategy
  ) {}

  public async GetAllPaymentHistoryThatPaidExecute(
    userId: string,
    leaseId: string
  ) {
    let strategy: IPaymentStrategy;
    const role = await this.getUserRole(userId);

    switch (role) {
      case UserRole.landlord:
        strategy = this.LandlordStrategy;
        break;
      case UserRole.student:
        strategy = this.StudentStrategy;
        break;

      default:
        throw new Error("Invalid user Role !!");
    }

    return await strategy.FindAllPaymentHistoryForLeaseThatPaid(
      userId,
      leaseId
    );
  }


    public async GetAllPaymentScheduleForSingleLeasesExecute(
    userId: string,
    leaseId: string
  ) {
    let strategy: IPaymentStrategy;
    const role = await this.getUserRole(userId);

    switch (role) {
      case UserRole.landlord:
        strategy = this.LandlordStrategy;
        break;
      case UserRole.student:
        strategy = this.StudentStrategy;
        break;

      default:
        throw new Error("Invalid user Role !!");
    }

    return await strategy.GetAllPaymentScheduleForSingleLeases(
      userId,
      leaseId
    );
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
