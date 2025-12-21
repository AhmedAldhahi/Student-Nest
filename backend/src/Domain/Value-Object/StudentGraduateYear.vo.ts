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
  constructor(private value?: number | undefined) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: number): studentGraduateYear {
    if (!value) throw new Error("student Graduated year is required");
    if (value < currentYear) throw new Error("invalid graduate year !!");

    return new studentGraduateYear(value);
  }

  /**
   * Returns the validated graduation year.
   *
   * @returns {number} The student's graduation year.
   */
  public getValue(): number | undefined {
    return this.value ?? undefined;
  }
}
