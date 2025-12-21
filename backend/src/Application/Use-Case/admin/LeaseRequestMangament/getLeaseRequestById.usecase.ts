import { GetLeaseRequestByIDQueriesHandler } from "../../../Querie/Handlers/GetLeaseRequestByIdQueriesHandler";
import { GetLeaseRequestById } from "../../../Querie/Queries/GetLeaseRequestById.Queries";

export class GetLeaseRequestByIdUseCase {
  constructor(
    private readonly queriesHandler: GetLeaseRequestByIDQueriesHandler
  ) {}

  public async execute(id: number) {
    try {
      const command = new GetLeaseRequestById(id);
      return await this.queriesHandler.handle(command);
    } catch (error: any) {
      console.error("fail to get lease request !!");
      throw error;
    }
  }
}
