import { IQueries } from "../../IQueries";

export class GetAllApartmentByQueriesQueries implements IQueries {
  public name: string;
  public userId: string;
  constructor(name: string, userId: string) {
    this.name = name;
    this.userId = userId;
  }
}
