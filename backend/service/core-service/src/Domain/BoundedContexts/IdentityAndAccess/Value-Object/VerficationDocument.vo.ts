/**
 * Value Object representing a student's verification document.
 *
 * Encapsulates validation logic to ensure a document value is provided.
 *
 * @class StudentVerificationDocument
 */
export class VerificationDocument {
  /** The student's verification document value. */
  constructor(private value?: string | null) {
    if (!value) {
      this.value = undefined;
      return;
    }
  }

  public static create(value: string): VerificationDocument {
    if (!value || value.trim().length === 0) {
      throw new Error("validate document is required !!");
    }

    return new VerificationDocument(value);
  }

  /**
   * Returns the student's verification document value.
   *
   * @returns {string} The verification document.
   */

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}
