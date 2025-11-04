import { DomainException } from "./DomainException.exception";

export class InvalidIsActiveException extends DomainException {
    constructor() {
        super("is active field is requied !");
    }
}
