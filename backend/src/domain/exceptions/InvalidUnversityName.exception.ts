import { DomainException } from "./DomainException.exception";

export class InvalidUnversityNameException extends DomainException {
    constructor() {
        super("unversity name field is requied !");
    }
}