import { deleteApartmentByIdCommand } from "../../../Apartment/Command/DeleteApartmentByIdCommand";
import { deleteApartmentByIdForLandlordCommandHandler } from "../../../Apartment/CommandHandler/DeleteApartmentByIdForLandlordCommandHandler";
import { GetAllApartmentForLandlord } from "../../../Apartment/Queries/GetAllApartmemtForLandlord";
import { GetApartmentByIdQueries } from "../../../Apartment/Queries/GetApartmentById";
import { GetAllApartmentByQueriesQueries } from "../../../Apartment/Queries/GetApartmentByQueries";
import { GetDocumentOfApartmentByIdQueries } from "../../../Apartment/Queries/GetDocumentOfApartmntByIdQueries";
import { GetAllApartmentByLandlordQueriesHandler } from "../../../Apartment/QueriesHandler/GetAllAartmentByLandlordQueriesHandler";
import { GetAllApartmentByQueriesForLandlordQueriesHandler } from "../../../Apartment/QueriesHandler/GetAllApartmentByQueriesForLandlordQueriesHandler";
import { GetApartmentByIdForLandlordQueriesHandler } from "../../../Apartment/QueriesHandler/GetApartmentByIdForLandlordQueriesHandler";
import { GetApartmentDocumentByIdForLandlordQueriersHandler } from "../../../Apartment/QueriesHandler/GetApartmentDocumentByIdForLandlordQueriesHandler";
import { IApartmentStrategy } from "./IApartment.strategy";

export class LandlordApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly GetApartmentForLandlordQH: GetAllApartmentByLandlordQueriesHandler,
    private readonly GetApartmentQueriesForLandlordQH: GetAllApartmentByQueriesForLandlordQueriesHandler,
    private readonly DeleteApartmentByIdForLandlordCH: deleteApartmentByIdForLandlordCommandHandler,
    private readonly GetApartmentDetailForLandlordQH: GetApartmentByIdForLandlordQueriesHandler,
    private readonly GetApartmentDocumentByIdForLandlordQH: GetApartmentDocumentByIdForLandlordQueriersHandler
  ) {}

  public async GetApartmentDetailById(
    userId: string,
    id: string
  ): Promise<any> {
    try {
      const Queries = new GetApartmentByIdQueries(id, userId);
      return await this.GetApartmentDetailForLandlordQH.handle(Queries);
    } catch (error: any) {
      console.error("fail to get apartment details !!");
      throw error;
    }
  }

  public async FindApartmentDocumentById(
    userId: string,
    id: string
  ): Promise<any> {
    try {
      const Queries = new GetDocumentOfApartmentByIdQueries(id, userId);
      return await this.GetApartmentDocumentByIdForLandlordQH.handle(Queries);
    } catch (error: any) {
      console.error("fail to get apartment documents !!");
      throw error;
    }
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

  public async deleteApartments(userId: string, id: string): Promise<any> {
    try {
      const command = new deleteApartmentByIdCommand(id, userId);
      return await this.DeleteApartmentByIdForLandlordCH.handle(command);
    } catch (error: any) {
      console.error("fail to delete specifics  apartments !!");
      throw error;
    }
  }
}
