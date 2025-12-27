import { currentYear } from "../../Shared/constants/validationZod.constant";

// Recommendation: Use PascalCase for Class names (StudentGraduateYear)
export class studentGraduateYear {
  constructor(private value?: number | undefined) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: number | string): studentGraduateYear {
    if (!value) throw new Error("Student graduate year is required");

    // 1. Fix: Match the test expectation "whole number"

    const yearNumber = Number(value);

    if (!Number.isInteger(yearNumber))
      throw new Error("Graduation year must be a whole number");

    // 2. Fix: Match "cannot" (one word)
    if (yearNumber < currentYear)
      throw new Error("Graduation year cannot be in the past");

    const maxReasonableYear = currentYear + 10;

    // 3. Fix: Match "cannot" and remove extra spaces
    if (yearNumber > maxReasonableYear)
      throw new Error(
        `Graduation year cannot be further than ${maxReasonableYear}`
      );

    return new studentGraduateYear(yearNumber);
  }

  public getValue(): number | undefined {
    return this.value ?? undefined;
  }
}
