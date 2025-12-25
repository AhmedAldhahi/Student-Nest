import { GetAllLeaseRequestQueriesHandler } from "../../../Queries/Handlers/GetAllLeaseRequestQueriesHandler";

export class GetAllLeaseRequestUseCase {
  constructor(
    private readonly queriesHandler: GetAllLeaseRequestQueriesHandler
  ) {}

  public async execute() {
    try {
      return await this.queriesHandler.handle();
    } catch (error: any) {
      console.error("fail to fetch request leases !!");
      throw error;
    }
  }
}
