import { GetApartmentDetailForGuestQueries } from "../../../Apartment/Queries/GetAllApartmentForGuest";
import { GetApartmentByIdForGuestQueriesHandler } from "../../../Apartment/QueriesHandler/GetApartmentForGuestUserQueriesHandler";
import { IApartmentStrategy } from "./IApartment.strategy";

export class GuestApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly getApartmentDetailForGuestQH: GetApartmentByIdForGuestQueriesHandler
  ) {}

  public async deleteApartments(userId: string, id: string): Promise<any> {
    throw new Error("Unauthorized: Guests cannot delete apartments.");
  }

  public async getApartmentByQueries(
    Queries: string,
    userId: string
  ): Promise<any> {
    throw new Error("Unauthorized: Guests cannot search apartments.");
  }

  public async getAllApartment(userId: string): Promise<any> {
    throw new Error("Unauthorized: Guests cannot get all  apartments.");
  }

  public async FindApartmentDocumentById(
    userId: string,
    id: string
  ): Promise<any> {
    throw new Error("Unauthorized: Guests cannot get apartments documents.");
  }

  public async GetApartmentDetailById(
    id: string,
    userId?: string
  ): Promise<any> {
    try {
      const Queries = new GetApartmentDetailForGuestQueries(id, "");
      return await this.getApartmentDetailForGuestQH.handle(Queries);
    } catch (error: any) {
      console.error("fail to get apartment details !!", error);
      throw error;
    }
  }
}
