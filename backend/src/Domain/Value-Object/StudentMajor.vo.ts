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
  constructor(private value?: string | undefined) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: string): StudentMajor {
    if (!value) throw new Error("studentMajor is required");

    const majorPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!majorPattern.test(value.trim())) {
      throw new Error(
        "Invalid major: only letters and single spaces are allowed. No numbers or special characters"
      );
    }
    return new StudentMajor(value);
  }

  /**
   * Returns the validated major name.
   *
   * @returns {string} The student's major.
   */
  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}
