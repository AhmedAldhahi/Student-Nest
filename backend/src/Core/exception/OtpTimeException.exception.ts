import { DomainException } from "./DomainException.exception";

export class OtpTimeException extends DomainException {
    constructor(message: string = "invalid otp code time") {
        super(message);
    }
}