import { ApplicationError } from "./ApplicationError.error";

export class NoUserExistException extends ApplicationError {
  constructor(message: string = "No user been found  !!") {
    super(message);
  }
}
