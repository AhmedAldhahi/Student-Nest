/**
 * Value Object representing a student's major field of study.
 *
 * Encapsulates validation logic to ensure:
 * - A major is provided
 * - Only letters and single spaces are allowed
 * - No numbers or special characters
 *
 * @class StudentMajor
 */
export class StudentMajor {
  /** The validated major name. */
  constructor(private value: string) {
    if (!value) throw new Error("studentMajor is required");

    const majorPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!majorPattern.test(value.trim())) {
      throw new Error(
        "Invalid major: only letters and single spaces are allowed. No numbers or special characters"
      );
    }
  }

  /**
   * Returns the validated major name.
   *
   * @returns {string} The student's major.
   */
  public getValue(): string {
    return this.value;
  }
}
