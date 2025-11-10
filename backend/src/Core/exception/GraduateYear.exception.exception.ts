import { DomainException } from "./DomainException.exception";

export class GraduatYearException extends DomainException {
  constructor(message: string = "invalid graduate year !!") {
    super(message);
  }
}
