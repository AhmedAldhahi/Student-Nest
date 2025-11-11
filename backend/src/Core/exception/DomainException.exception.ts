export class DomainException extends Error {
  constructor(message: string, public statusCode = 400) {
    super(message);
    this.name = "DomainError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
