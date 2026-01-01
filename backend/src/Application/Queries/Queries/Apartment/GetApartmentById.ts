import { IQueries } from "../../IQueries";

export class GetApartmentByIdQueries implements IQueries {
  public id: string;
  constructor(id: string) {
    this.id = id;
  }
}
