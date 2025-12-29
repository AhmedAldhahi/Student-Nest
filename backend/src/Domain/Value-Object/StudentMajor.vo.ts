export class StudentMajor {
  constructor(private readonly value?: string | undefined) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: string): StudentMajor {
    if (!value || value.trim().length === 0) {
      throw new Error("Student Major is required");
    }

    const trimmedValue = value.trim();

   
    const majorPattern = /^[A-Za-z&.\-]+(?: [A-Za-z&.\-]+)*$/;

    if (!majorPattern.test(trimmedValue)) {
      throw new Error(
        "Invalid major: Only letters, spaces, '&', '-', and '.' are allowed."
      );
    }

    return new StudentMajor(trimmedValue);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}