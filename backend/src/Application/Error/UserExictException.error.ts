import { ApplicationError } from "./ApplicationError.error";

export class UserExictException extends ApplicationError {
  constructor(message: string = "User is email is been used !!") {
    super(message);
  }
}
