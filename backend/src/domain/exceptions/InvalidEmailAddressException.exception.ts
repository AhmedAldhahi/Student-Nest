import { DomainException } from "./DomainException.exception";

export class InvalidEmailAddressException extends DomainException {
    constructor() {
        super("email field is requird !");
    }
}