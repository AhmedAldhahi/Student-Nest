import { DomainException } from "./DomainException.exception";

export class InvalidGraduageYearException extends DomainException {
    constructor() {
        super("graduate year field is requied !");
    }
}