export class DomainException extends Error {
    constructor(message: string, public statusCode = 400) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }