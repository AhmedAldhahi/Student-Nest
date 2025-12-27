import { currentYear } from "../../Shared/constants/validationZod.constant";

// Recommendation: Use PascalCase for Class names (StudentGraduateYear)
export class studentGraduateYear {
  constructor(private value?: string | undefined) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: string): studentGraduateYear {
    if (!value) throw new Error("Student graduate year is required");

    // 1. Fix: Match the test expectation "whole number"
    const trimmed = value.trim();
    const isNumeric = /^\d+$/.test(trimmed);

    if (!isNumeric) {
      throw new Error("Student card ID must contain only numbers");
    }

    const numValue = Number.parseInt(value);

    // 2. Fix: Match "cannot" (one word)
    if (numValue < currentYear)
      throw new Error("Graduation year cannot be in the past");

    const maxReasonableYear = currentYear + 10;

    // 3. Fix: Match "cannot" and remove extra spaces
    if (numValue > maxReasonableYear)
      throw new Error(
        `Graduation year cannot be further than ${maxReasonableYear}`
      );

    return new studentGraduateYear(numValue.toString());
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}
