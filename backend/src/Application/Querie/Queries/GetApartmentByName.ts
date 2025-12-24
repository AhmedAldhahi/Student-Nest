import { IQueries } from "../IQuerie";

export class GetAllApartmentByTitleQueries implements IQueries {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
