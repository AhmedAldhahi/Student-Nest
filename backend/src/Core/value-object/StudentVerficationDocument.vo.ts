export class StudentVerificationDocument {
  constructor(private value: string) {
    if (!value) throw new Error("validate document is required !!");
  }

  public getValue(): string {
    return this.value;
  }
}
