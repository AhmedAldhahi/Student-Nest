import { DomainException } from "./DomainException.exception";

export class InvalidDateOfBirthException extends DomainException {
   constructor() {
      super("Date of birth field is required");
  }
}

