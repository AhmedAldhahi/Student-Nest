import { DomainException } from "./DomainException.exception";

export class OtpCodeException extends DomainException {
    constructor(message: string = "otp code invalid") {
        super(message);
    }
}