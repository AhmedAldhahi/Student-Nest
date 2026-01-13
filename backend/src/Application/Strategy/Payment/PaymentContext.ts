import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { IPaymentStrategy } from "./IPayment.strategy";
import { LandlordPaymentStrategy } from "./LandlordPayment.strategy";
import { StudentPaymentStrategy } from "./StudentPayment.strategy";

export class PaymentContext {
  constructor(
    private readonly LandlordStrategy: LandlordPaymentStrategy,
    private readonly StudentStrategy: StudentPaymentStrategy
  ) {}

  public async GetAllPaymentHistoryThatPaidExecute(
    userId: string,
    role: UserRole,
    leaseId: string
  ) {
    let strategy: IPaymentStrategy;
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
}
