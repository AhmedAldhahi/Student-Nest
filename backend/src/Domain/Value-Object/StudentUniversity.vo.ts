/**
 * Value Object representing a student's university name.
 *
 * Encapsulates validation logic to ensure:
 * - A university name is provided
 * - Only letters and single spaces are allowed
 * - No numbers or special characters
 *
 * @class StudentUniversity
 */
export class StudentUniversity {
  /** The validated university name. */
  constructor(private value?: string | undefined) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): StudentUniversity {
    if (!value) throw new Error("university Name is required");

    const UniversityPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const trimmedName = value.trim();

    if (!UniversityPattern.test(trimmedName)) {
      throw new Error(
        "Invalid University: only letters and single spaces are allowed. No numbers or special characters"
      );
    }
    return new StudentUniversity(trimmedName);
  }

  /**
   * Returns the validated university name.
   *
   * @returns {string} The university name.
   */
  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}
