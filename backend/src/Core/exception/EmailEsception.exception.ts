import { DomainException } from "./DomainException.exception";

export class EmailFormateException extends DomainException {
  constructor(message: string = "invalid Student email formate !!") {
    super(message);
  }
}
