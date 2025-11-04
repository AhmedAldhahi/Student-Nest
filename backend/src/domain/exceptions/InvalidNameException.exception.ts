import { DomainException } from "./DomainException.exception";

export class InvalidUserNameException extends DomainException {
    constructor() {
        super("User  Name field is required");
    }
}



