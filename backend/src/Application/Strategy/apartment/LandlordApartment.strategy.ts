import { deleteApartmentByIdCommand } from "../../Command/Commands/Apartment/DeleteApartmentByIdCommand";
import { deleteApartmentByIdForLandlordCommandHandler } from "../../Command/Handlers/Housing/Apartment/DeleteApartmentForLandlordCommandHandler";
import { GetAllApartmentByLandlordQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetAllAartmentByLandlordQueriesHandler";
import { GetAllApartmentByQueriesForLandlordQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetAllApartmentByQueriesForLandlordQueriesHandler";
import { GetApartmentByIdForLandlordQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetApartmentByIdForLandlordQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetApartmentDocumentById.QueriesHandler";
import { GetApartmentDocumentByIdForLandlordQueriersHandler } from "../../Queries/Handlers/Housing/Apartment/GetApartmentDocumentByIdForLandlordQueriesHandler";
import { GetAllApartmentForLandlord } from "../../Queries/Queries/Apartment/GetAllApartmemtForLandlord";
import { GetApartmentByIdQueries } from "../../Queries/Queries/Apartment/GetApartmentById";
import { GetAllApartmentByQueriesQueries } from "../../Queries/Queries/Apartment/GetApartmentByQueries";
import { GetDocumentOfApartmentByIdQueries } from "../../Queries/Queries/Apartment/GetDocumentOfApartmntByIdQueries";
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
