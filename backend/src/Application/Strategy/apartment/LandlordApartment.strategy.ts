import { GetAllApartmentByLandlordQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetAllAartmentByLandlordQueriesHandler";
import { GetAllApartmentForLandlord } from "../../Queries/Queries/Apartment/GetAllApartmemtForLandlord";
import { IApartmentStrategy } from "./IApartment.strategy";

export class LandlordApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly GetApartmentForLandlordQH: GetAllApartmentByLandlordQueriesHandler
  ) {}

  public async GetApartmentDetailById(
    userId: string,
    id: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async FindApartmentDocumentById(
    userId: string,
    id: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async getAllApartment(userId: string): Promise<any> {
    try {
      const Queries = new GetAllApartmentForLandlord(userId);
      return await this.GetApartmentForLandlordQH.handle(Queries);

    } catch (error: any) {
      console.error("fail to get apartment for landlord !!");
      throw error;
    }
  }

  public async getApartmentByQueries(
    Queries: string,
    userId: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async deleteApartments(userId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
