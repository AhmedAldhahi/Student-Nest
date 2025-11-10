import { DomainException } from "./DomainException.exception";

export class UnversityException extends DomainException {
  constructor(
    message: string = "Invalid Unversity: only letters and single spaces are allowed. No numbers or special characters"
  ) {
    super(message);
  }
}
