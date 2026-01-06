import { GetAllApartmentThatBeenBookedQueriesHandler } from "../../../Queries/Handlers/Housing/Apartment/GetAllApartmentForLandlordThatbookenQueriesHandler";
import { GetAllApartmentBeenBookedQueries } from "../../../Queries/Queries/Apartment/GetAllApartmentBeenBooked";

export class GetBookedApartmentUseCase {
  constructor(
    private readonly QueriesHandler: GetAllApartmentThatBeenBookedQueriesHandler
  ) {}

  public async execute(userId: string) {
    try {
      const queries = new GetAllApartmentBeenBookedQueries(userId);
      return await this.QueriesHandler.handle(queries);

    } catch (error: any) {
      console.error("fail to get booked apartments !!");
      throw error;
    }
  }
}
