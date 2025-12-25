import { IQueries } from "../IQueries";

export class GetAllApartmentByTitleQueries implements IQueries {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
