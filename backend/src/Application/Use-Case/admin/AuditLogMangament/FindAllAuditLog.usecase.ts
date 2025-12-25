import { GetAllAuditLogQueriesHandler } from "../../../Queries/Handlers/GetAllAuditLogQueriesHandler";

export class FindAllAuditLogUseCase {
  constructor(private readonly queriesHandler: GetAllAuditLogQueriesHandler) {}

  public async execute() {
    try {
      return await this.queriesHandler.handle();
    } catch (error: any) {
      console.error("fail to get all audit log !!");
      throw error;
    }
  }
}
