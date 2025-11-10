export class EmailServiceError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 400) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'Email Service Error';
    }
  }