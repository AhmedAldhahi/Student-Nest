import { IQueries } from "../../Shared/abstraction/IQueries";
import { MakeFilterSearchRequest } from "../Dto/Request/MakeFilterSeachRequest";

export class FilterApartmentCommand implements IQueries {
  minAge?: string;
  maxAge?: string;
  minPrice?: string;
  maxPrice?: string;
  public University?: string;
  public isJoin?: boolean;
  // will add pagination later

  constructor(data: MakeFilterSearchRequest) {
    this.minAge = data.minAge;
    this.maxAge = data.maxAge;
    this.minPrice = data.minPrice;
    this.maxPrice = data.maxPrice;
    this.University = data.University;
    this.isJoin = data.isJoint;
  }
}
