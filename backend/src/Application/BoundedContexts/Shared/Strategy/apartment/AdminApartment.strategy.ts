import { DeleteApartmentByIdForAdminCommandHandler } from "../../../Adminstration/CommandHandler/DeleteApartmentByIdForAdminCommandHandler";
import { DeleteApartmentResponse } from "../../../Adminstration/Dto/Response/DeleteApartmentResponse";
import { deleteApartmentByIdCommand } from "../../../Apartment/Command/DeleteApartmentByIdCommand";
import { GetAllApartmentQueries } from "../../../Apartment/Queries/GetAllApartment";
import { GetApartmentByIdQueries } from "../../../Apartment/Queries/GetApartmentById";
import { GetAllApartmentByQueriesQueries } from "../../../Apartment/Queries/GetApartmentByQueries";
import { GetDocumentOfApartmentByIdQueries } from "../../../Apartment/Queries/GetDocumentOfApartmntByIdQueries";
import { GetAllApartmentForAdminQueriesHandler } from "../../../Apartment/QueriesHandler/GetAllApartmentForAdminQueriesHandler";
import { GetAllApartmentByQueryForAdminQueriesHandler } from "../../../Apartment/QueriesHandler/GetAllApartmentQueriesForAdmin";
import { GetApartmentByIdQueriesHandler } from "../../../Apartment/QueriesHandler/GetApartmentByIdQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../../Apartment/QueriesHandler/GetApartmentDocumentById.QueriesHandler";
import { IApartmentStrategy } from "./IApartment.strategy";

export class AdminApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly commandHandler: DeleteApartmentByIdForAdminCommandHandler,
    private readonly SearchForApartmentByQH: GetAllApartmentByQueryForAdminQueriesHandler,
    private readonly GetAllApartmentQH: GetAllApartmentForAdminQueriesHandler,
    private readonly GetApartmentDocumentByIdQH: GetApartmentDocumentByIdQueriesHandler,
    private readonly GetApartmentDetailByIdQH: GetApartmentByIdQueriesHandler
  ) {}

  public async GetApartmentDetailById(
    userId: string,
    id: string
  ): Promise<any> {
    try {
      const queries = new GetApartmentByIdQueries(id, userId);
      return await this.GetApartmentDetailByIdQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartment by id, !!", error);
      throw error;
    }
  }

  public async FindApartmentDocumentById(
    userId: string,
    id: string
  ): Promise<any> {
    try {
      const queries = new GetDocumentOfApartmentByIdQueries(id, userId);
      return await this.GetApartmentDocumentByIdQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartment documents", error);
      throw error;
    }
  }

  public async getAllApartment(userId: string): Promise<any> {
    try {
      const Queries = new GetAllApartmentQueries(userId);

      return await this.GetAllApartmentQH.handle(Queries);
    } catch (error: any) {
      console.error("fail to get all apartments", error);
    }
  }

  public async getApartmentByQueries(
    Queries: string,
    userId: string
  ): Promise<any> {
    try {
      const queries = new GetAllApartmentByQueriesQueries(Queries, userId);
      return await this.SearchForApartmentByQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartments !!");
      throw error;
    }
  }

  public async deleteApartments(
    userId: string,
    id: string
  ): Promise<DeleteApartmentResponse> {
    try {
      const command = new deleteApartmentByIdCommand(id, userId);
      return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to delete apartments !!");
      throw error;
    }
  }
}
