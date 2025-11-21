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

  /**
   * Returns the validated university name.
   *
   * @returns {string} The university name.
   */
  public getValue(): string {
    return this.value;
  }
}
