import { UserRole } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { AdminApartmentStrategy } from "./AdminApartment.strategy";
import { GuestApartmentStrategy } from "./GuestApartment.strategy";
import { IApartmentStrategy } from "./IApartment.strategy";
import { LandlordApartmentStrategy } from "./LandlordApartment.strategy";

export class ApartmentContext {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly adminStrategy: AdminApartmentStrategy,
    private readonly landlordStrategy: LandlordApartmentStrategy,
    private readonly guestStrategy: GuestApartmentStrategy
  ) {}

  public async DeleteApartment(userId: string, id: string) {
    try {
      const strategy = await this.getStrategy(userId);

      return strategy.deleteApartments(userId, id);
    } catch (error: any) {
      console.error("fail to delete apartment ", error);
      throw error;
    }
  }

  public async GetApartmentsBySearchByQueries(userId: string, Queried: string) {
    try {
      const strategy = await this.getStrategy(userId);

      return strategy.getApartmentByQueries(Queried, userId);
    } catch (error: any) {
      console.error("fail to get apartment by queries  ", error);
      throw error;
    }
  }

  public async executeGetAllApartments(userId: string) {
    try {
      const strategy = await this.getStrategy(userId);

      return strategy.getAllApartment(userId);
    } catch (error: any) {
      console.error("fail to get apartments  ", error);
      throw error;
    }
  }

  public async executeApartmentDocumentById(userId: string, id: string) {
    try {
      const strategy = await this.getStrategy(userId);

      return strategy.FindApartmentDocumentById(userId, id);
    } catch (error: any) {
      console.error("fail to get apartment  documents by id  ", error);
      throw error;
    }
  }

  public async executeGetApartmentDetailById(
    id: string,
    userId?: string | undefined
  ) {
    try {
      const strategy = await this.getStrategy(userId);

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

  private async getStrategy(userId?: string): Promise<IApartmentStrategy> {
    if (!userId) {
      return this.guestStrategy;
    }

    // 2. LOGGED IN: Fetch Role
    const role = await this.GetUserRole(userId);

    switch (role) {
      case UserRole.admin:
        return this.adminStrategy;
      case UserRole.landlord:
        return this.landlordStrategy;
      case UserRole.student:
        return this.guestStrategy;
      default:
        return this.guestStrategy;
    }
  }
}
