import { IQueries } from "../IQueries";

export class GetApartmentByIdQueries implements IQueries {
  public id: number;
  constructor(id: number) {
    this.id = id;
  }
}
