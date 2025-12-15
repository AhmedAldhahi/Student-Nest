/**
 * Value Object representing a student's verification document.
 *
 * Encapsulates validation logic to ensure a document value is provided.
 *
 * @class StudentVerificationDocument
 */
export class VerificationDocument {
  /** The student's verification document value. */
  constructor(private value: string) {
    if (this.value === undefined) {
      return;
    }
    if (!this.value || this.value.trim().length === 0) {
      throw new Error("validate document is required !!");
    } 
  }

  /**
   * Returns the student's verification document value.
   *
   * @returns {string} The verification document.
   */
  public getValue(): string {
    return this.value;
  }
}
