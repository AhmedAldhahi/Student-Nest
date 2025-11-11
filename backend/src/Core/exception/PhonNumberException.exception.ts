import { DomainException } from "./DomainException.exception";

export class phoneNumberFormateException extends DomainException {
  constructor(
    message: string = "Invalid phone number. Use international format (+[countrycode][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX)."
  ) {
    super(message);
  }
}
