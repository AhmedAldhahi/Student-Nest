import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { AdminDeleteApartmentStrategy } from "./AdminDeleteApartment.strategy";
import { IApartmentStrategy } from "./IApartment.strategy";
import { LandlordDeleteApartmentStrategy } from "./LandlordDeleteApartment.strategy";

export class ApartmentContext {
  constructor(
    private readonly adminStrategy: AdminDeleteApartmentStrategy,
    private readonly landlordStrategy: LandlordDeleteApartmentStrategy
  ) {}

  public async DeleteApartment(userId: number, role: UserRole) {
    try {
      let strategy: IApartmentStrategy;
      switch (role) {
        case UserRole.admin:
          strategy = this.adminStrategy;
          break;
        case UserRole.landlord:
          strategy = this.landlordStrategy;
          break;

        default:
          throw new Error("Invalid user Role");
      }

      return strategy.deleteApartments(userId);
    } catch (error: any) {}
  }
}
