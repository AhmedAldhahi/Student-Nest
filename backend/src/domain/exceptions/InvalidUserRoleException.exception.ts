import { DomainException } from "./DomainException.exception";

export class InvalidUserRoleErrorException extends DomainException {
    constructor() {
        super("user role is requied field!");
    }
}