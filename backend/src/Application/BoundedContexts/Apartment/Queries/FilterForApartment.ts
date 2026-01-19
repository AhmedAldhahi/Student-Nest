import { IQueries } from "../../Shared/abstraction/IQueries";
import { MakeFilterSearchRequest } from "../Dto/Request/MakeFilterSeachRequest";

export class FilterApartmentCommand implements IQueries {
  public age?: [string, string];
  public price?: [string, string];
  public University?: string;
  public isJoin?: boolean;
  // will add pagination later

  constructor(data: MakeFilterSearchRequest) {
    this.age = data.age;
    this.price = data.price;
    this.University = data.University;
    this.isJoin = data.isJoint;
  }
}
