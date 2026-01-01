import { GetAllApartmentByLandlordQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetAllAartmentByLandlordQueriesHandler";
import { GetAllApartmentByQueriesForLandlordQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetAllApartmentByQueriesForLandlordQueriesHandler";
import { GetAllApartmentForLandlord } from "../../Queries/Queries/Apartment/GetAllApartmemtForLandlord";
import { GetAllApartmentByQueriesQueries } from "../../Queries/Queries/Apartment/GetApartmentByQueries";
import { IApartmentStrategy } from "./IApartment.strategy";

export class LandlordApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly GetApartmentForLandlordQH: GetAllApartmentByLandlordQueriesHandler,
    private readonly GetApartmentQueriesForLandlordQH: GetAllApartmentByQueriesForLandlordQueriesHandler
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
    try {
      const queries = new GetAllApartmentByQueriesQueries(Queries, userId);
      return await this.GetApartmentQueriesForLandlordQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartments !!");
      throw error;
    }
  }

  public async deleteApartments(userId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
