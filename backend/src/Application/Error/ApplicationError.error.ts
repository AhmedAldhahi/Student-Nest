export class ApplicationError extends Error {
    constructor(message: string, public statusCode = 400) {
      super(message);
      this.name = "ApplicatonError";
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  