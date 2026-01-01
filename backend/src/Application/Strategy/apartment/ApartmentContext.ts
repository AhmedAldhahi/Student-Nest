import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { AdminApartmentStrategy } from "./AdminApartment.strategy";
import { IApartmentStrategy } from "./IApartment.strategy";
import { LandlordApartmentStrategy } from "./LandlordApartment.strategy";

export class ApartmentContext {
  constructor(
    private readonly adminStrategy: AdminApartmentStrategy,
    private readonly landlordStrategy: LandlordApartmentStrategy
  ) {}

  public async DeleteApartment(userId: string, role: UserRole,id:string) {
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

      return strategy.deleteApartments(userId,id);
    } catch (error: any) {}
  }

  public async GetApartmentsBySearchByQueries(
    userId: string,
    role: UserRole,
    Queried: string
  ) {
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

      return strategy.getApartmentByQueries(Queried, userId);
    } catch (error: any) {}
  }

  public async executeGetAllApartments(userId: string, role: UserRole) {
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

      return strategy.getAllApartment(userId);
    } catch (error: any) {}
  }

  public async executeApartmentDocumentById(
    userId: string,
    role: UserRole,
    id: string
  ) {
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

      return strategy.FindApartmentDocumentById(userId, id);
    } catch (error: any) {}
  }

  public async executeGetApartmentDetailById(
    userId: string,
    role: UserRole,
    id: string
  ) {
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

      return strategy.GetApartmentDetailById(userId, id);
    } catch (error: any) {}
  }
}
