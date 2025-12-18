import { GetAllLandlordQueriesHandler } from "../../../Querie/Handlers/GetAllLandlordQueriesHandler";

//TODO: need to refactor for DRY principle
export class GetAllLandlordUseCase {
  constructor(private readonly queryHandler: GetAllLandlordQueriesHandler) {}

  public async execute() {
    try {
      return await this.queryHandler.handle();
    } catch (error: any) {
      throw error;
    }
  }
}
