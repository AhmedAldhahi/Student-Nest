import { DomainException } from "./DomainException.exception";

export class NameException extends DomainException {
  constructor(message: string = "User name is required") {
    super(message);
  }
}
