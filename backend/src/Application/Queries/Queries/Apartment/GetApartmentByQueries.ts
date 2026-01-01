import { IQueries } from "../../IQueries";

export class GetAllApartmentByQueriesQueries implements IQueries {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
