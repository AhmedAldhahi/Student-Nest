import { DomainException } from "./DomainException.exception";

export class UserGovIdException extends DomainException {
  constructor(message: string = "Invalid Goverment id exception !!") {
    super(message);
  }
}
