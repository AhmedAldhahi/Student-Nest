import { DomainException } from "./DomainException.exception";

export class StudentCardIdException extends DomainException {
    constructor(message: string = "invalid student card Id !!") {
        super(message);
    }
}