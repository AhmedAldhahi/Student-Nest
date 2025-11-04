export class InvalidPhoneNumberException extends Error {
  public readonly statusCode: number;

  constructor() {
    super("Phone number field is required");
  }
}
