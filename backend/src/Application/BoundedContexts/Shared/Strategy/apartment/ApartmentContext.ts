import { UserRole } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { AdminApartmentStrategy } from "./AdminApartment.strategy";
import { GuestApartmentStrategy } from "./GuestApartment.strategy";
import { IApartmentStrategy } from "./IApartment.strategy";
import { LandlordApartmentStrategy } from "./LandlordApartment.strategy";
import { StudentApartmentStrategy } from "./StudentApartment.strategy";

export class ApartmentContext {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly adminStrategy: AdminApartmentStrategy,
    private readonly landlordStrategy: LandlordApartmentStrategy,
    private readonly studentStrategy: StudentApartmentStrategy
  ) {}

  public async DeleteApartment(userId: string, id: string) {
    try {
      let strategy: IApartmentStrategy;
      const role = await this.GetUserRole(userId);

      switch (role) {
        case UserRole.admin:
          strategy = this.adminStrategy;
          break;

        case UserRole.landlord:
          strategy = this.landlordStrategy;
          break;

        default:
          throw new Error("Invalid role !!");
      }
      return strategy.deleteApartments(userId, id);
    } catch (error: any) {
      console.error("fail to delete apartment ", error);
      throw error;
    }
  }

  public async GetApartmentsBySearchByQueries(userId: string, Queried: string) {
    try {
      let strategy: IApartmentStrategy;
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
      return strategy.getApartmentByQueries(Queried, userId);
    } catch (error: any) {
      console.error("fail to get apartment by queries  ", error);
      throw error;
    }
  }

  public async executeGetAllApartments(userId: string) {
    try {
      let strategy: IApartmentStrategy;
      const role = await this.GetUserRole(userId);

      switch (role) {
        case UserRole.admin:
          strategy = this.adminStrategy;
          break;

        case UserRole.landlord:
          strategy = this.landlordStrategy;
          break;

        default:
          throw new Error("Invalid role !!");
      }
      return strategy.getAllApartment(userId);
    } catch (error: any) {
      console.error("fail to get apartments  ", error);
      throw error;
    }
  }

  public async executeApartmentDocumentById(userId: string, id: string) {
    try {
      let strategy: IApartmentStrategy;
      const role = await this.GetUserRole(userId);

      switch (role) {
        case UserRole.admin:
          strategy = this.adminStrategy;
          break;

        case UserRole.landlord:
          strategy = this.landlordStrategy;
          break;

        default:
          throw new Error("Invalid role !!");
      }
      return strategy.FindApartmentDocumentById(userId, id);
    } catch (error: any) {
      console.error("fail to get apartment  documents by id  ", error);
      throw error;
    }
  }

  public async executeGetApartmentDetailById(id: string, userId: string) {
    try {
      let strategy: IApartmentStrategy;
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
      return strategy.GetApartmentDetailById(id, userId);
    } catch (error: any) {
      console.error("fail to get apartment details", error);
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
