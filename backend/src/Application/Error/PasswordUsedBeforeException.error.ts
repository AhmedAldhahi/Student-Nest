import { ApplicationError } from "./ApplicationError.error";

export class PasswordBeenUsedBeforeException extends ApplicationError {
  constructor(
    message: string = "you choice this pass before try another one !!"
  ) {
    super(message);
  }
}
