import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetApartmentDetailForGuestQueries implements IQueries {
  public id: string;
  constructor(id: string) {
    this.id = id;
  }
}
