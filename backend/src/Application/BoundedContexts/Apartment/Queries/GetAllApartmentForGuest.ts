import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetApartmentDetailForGuestQueries implements IQueries {
  public userId?: string | undefined;
  public id:string;
  constructor(id : string, userId?: string | undefined) {
    this.userId = userId;
    this.id = id;
  }
}
