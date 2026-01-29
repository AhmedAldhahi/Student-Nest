import { IQueries } from "../../Shared/abstraction/IQueries";

export class ApartmentBased implements IQueries {
  public limit?: number;

  constructor(limit?: number) {
    this.limit = limit;
  }
}
