import { GetApartmentDetailForGuestQueries } from "../../../Apartment/Queries/GetAllApartmentForGuest";
import { GetApartmentByIdQueries } from "../../../Apartment/Queries/GetApartmentById";
import { GetApartmentByIdQueriesHandler } from "../../../Apartment/QueriesHandler/GetApartmentByIdQueriesHandler";
import { GetApartmentByIdForGuestQueriesHandler } from "../../../Apartment/QueriesHandler/GetApartmentForGuestUserQueriesHandler";
import { IApartmentStrategy } from "./IApartment.strategy";

export class StudentApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly GetApartmentDetailByIdQH: GetApartmentByIdQueriesHandler
  ) {}

  public async deleteApartments(userId: string, id: string): Promise<any> {
    throw new Error("Unauthorized: student cannot delete apartments.");
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
    throw new Error("Unauthorized: student cannot get apartments documents.");
  }

  public async GetApartmentDetailById(
    id: string,
    userId: string
  ): Promise<any> {
    try {
      const queries = new GetApartmentByIdQueries(id, userId);
      return await this.GetApartmentDetailByIdQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartment by id, !!", error);
      throw error;
    }
  }
}
