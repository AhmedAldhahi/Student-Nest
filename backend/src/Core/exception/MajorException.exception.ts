import { DomainException } from "./DomainException.exception";

export class MajorException extends DomainException {
  constructor(
    message: string = "Invalid major: only letters and single spaces are allowed. No numbers or special characters"
  ) {
    super(message);
  }
}
