import { GetAllLeaseQueriesHandler } from "../../../Queries/Handlers/GetAllLeaseQueriesHandler";

export class FindAllLeaseUseCase {
  constructor(private readonly queriesHandler: GetAllLeaseQueriesHandler) {}

  public async execute() {
    try {
      return await this.queriesHandler.handle();
    } catch (error: any) {
      console.error("fail to get leases !!", error);
      throw error;
    }
  }
}
