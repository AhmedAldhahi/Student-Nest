import { currentYear } from "../../Shared/constants/validationZod.constant";

/**
 * Value Object representing a student's graduation year.
 *
 * Encapsulates validation logic to ensure:
 * - A graduation year is provided
 * - The year is not in the past compared to the current year
 *
 * @class studentGraduateYear
 */
export class studentGraduateYear {
  /** The validated graduation year. */
  constructor(private value: number) { 
    if (!value) throw new Error("student Graduated year is required");
    if (value < currentYear) throw new Error("invalid graduate year !!");
  }

  /**
   * Returns the validated graduation year.
   *
   * @returns {number} The student's graduation year.
   */
  public getValue(): number {
    return this.value;
  }
}
