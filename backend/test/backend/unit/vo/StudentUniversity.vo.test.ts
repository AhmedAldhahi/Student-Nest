export class StudentUniversity {
  constructor(private value: string) {
    if (!value) throw new Error("university Name is required");

    const UniversityPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const trimmedName = value.trim();

    if (!UniversityPattern.test(trimmedName)) {
      throw new Error(
        "Invalid University: only letters and single spaces are allowed. No numbers or special characters"
      );
    }
  }

  public getValue(): string {
    return this.value;
  }
}
