import { IQueries } from "../IQuerie";

export class GetApartmentByIdQueries implements IQueries {
  public id: number;
  constructor(id: number) {
    this.id = id;
  }
}
