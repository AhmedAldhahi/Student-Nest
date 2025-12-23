import { IQueries } from "../IQuerie";

export class GetAllApartmentByNameQueries implements IQueries {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
