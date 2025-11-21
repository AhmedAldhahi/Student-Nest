export class StudentMajor {
  constructor(private value: string) {
    if (!value) throw new Error("studentMajor is required");
    const majorPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!majorPattern.test(value.trim())) {
      throw new Error(
        "Invalid major: only letters and single spaces are allowed. No numbers or special characters"
      );
    }
  }

  public getValue(): string {
    return this.value;
  }
}
