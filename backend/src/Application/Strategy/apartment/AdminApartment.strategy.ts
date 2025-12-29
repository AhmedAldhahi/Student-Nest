import { deleteApartmentByIdCommand } from "../../Command/Commands/DeleteApartmentByIdCommand";
import { deleteApartmentByIdCommandHandler } from "../../Command/Handlers/DeleteApartmentByIdCommandHandler";
import { GetAllApartmentByQueryQueriesHandler } from "../../Queries/Handlers/GetAllApartmentQueries.QueriesHandler";
import { GetAllApartmentQueriesHandler } from "../../Queries/Handlers/GetAllApartmentQueriesHandler";
import { GetApartmentByIdQueriesHandler } from "../../Queries/Handlers/GetApartmentByIdQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../Queries/Handlers/GetApartmentDocumentById.QueriesHandler";
import { GetApartmentByIdQueries } from "../../Queries/Queries/GetApartmentById";
import { GetAllApartmentByTitleQueries } from "../../Queries/Queries/GetApartmentByName";
import { GetDocumentOfApartmentByIdQueries } from "../../Queries/Queries/GetDocumentOfApartmntByIdQueries";
import { IApartmentStrategy } from "./IApartment.strategy";

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
    id: number
  ): Promise<any> {
    try {
      const queries = new GetApartmentByIdQueries(id);
      return await this.GetApartmentDetailByIdQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartment by id, !!", error);
      throw error;
    }
  }

  public async FindApartmentDocumentById(
    userId: string,
    id: number
  ): Promise<any> {
    try {
      const queries = new GetDocumentOfApartmentByIdQueries(id);
      return await this.GetApartmentDocumentByIdQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartment documents", error);
      throw error;
    }
  }

  public async getAllApartment(userId: string): Promise<any> {
    try {
      return await this.GetAllApartmentQH.handle();
    } catch (error: any) {
      console.error("fail to get all apartments", error);
    }
  }

  public async getApartmentByQueries(
    Queries: string,
    userId: string
  ): Promise<any> {
    try {
      const queries = new GetAllApartmentByTitleQueries(Queries);
      return await this.SearchForApartmentByQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get apartments !!");
      throw error;
    }
  }

  public async deleteApartments(userId: number): Promise<any> {
    try {
      const command = new deleteApartmentByIdCommand(userId);
      return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to delete apartments !!");
      throw error;
    }
  }
}
