import { GetApartmentByIdQueries } from "../../Queries/Queries/Apartment/GetApartmentById";
import { GetDocumentOfApartmentByIdQueries } from "../../Queries/Queries/Apartment/GetDocumentOfApartmntByIdQueries";
import { IApartmentStrategy } from "./IApartment.strategy";
import { deleteApartmentByIdCommandHandler } from "../../Command/Handlers/Housing/Apartment/DeleteApartmentByIdCommandHandler";
import { deleteApartmentByIdCommand } from "../../Command/Commands/Apartment/DeleteApartmentByIdCommand";
import { GetAllApartmentByQueriesQueries } from "../../Queries/Queries/Apartment/GetApartmentByQueries";
import { GetAllApartmentByQueryQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetAllApartmentQueries.QueriesHandler";
import { GetAllApartmentQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetAllApartmentQueriesHandler";
import { GetApartmentByIdQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetApartmentByIdQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../Queries/Handlers/Housing/Apartment/GetApartmentDocumentById.QueriesHandler";
import { GetAllApartmentQueries } from "../../Queries/Queries/Apartment/GetAllApartment";
export class AdminApartmentStrategy implements IApartmentStrategy {
  constructor(
    private readonly commandHandler: deleteApartmentByIdCommandHandler,
    private readonly SearchForApartmentByQH: GetAllApartmentByQueryQueriesHandler,
    private readonly GetAllApartmentQH: GetAllApartmentQueriesHandler,
    private readonly GetApartmentDocumentByIdQH: GetApartmentDocumentByIdQueriesHandler,
    private readonly GetApartmentDetailByIdQH: GetApartmentByIdQueriesHandler
  ) {}

  public async GetApartmentDetailById(
    userId: string,
    id: string
  ): Promise<any> {
    try {
      const queries = new GetApartmentByIdQueries(id,userId);
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
      const queries = new GetDocumentOfApartmentByIdQueries(id,userId);
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
      const queries = new GetAllApartmentByQueriesQueries(Queries,userId);
      return await this.SearchForApartmentByQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartments !!");
      throw error;
    }
  }

  public async deleteApartments(userId: string,id:string): Promise<any> {
    try {
      const command = new deleteApartmentByIdCommand(id,userId);
      return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to delete apartments !!");
      throw error;
    }
  }
}
