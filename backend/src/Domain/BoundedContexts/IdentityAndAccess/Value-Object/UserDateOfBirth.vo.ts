import { currentYear } from "../../../../Shared/constants/validationZod.constant";

export class UserDateOfBirth {
  // Public constructor for the Mapper (Reconstitution)
  constructor(private readonly value?: string | undefined) {}

  // Factory method for the Controller/User Input (Validation)
  public static create(value: string): UserDateOfBirth {
    if (!value) throw new Error("Date of birth is required for registration");

    // 1. Check Format (YYYY)
    if (!/^\d{4}$/.test(value)) {
      throw new Error("Invalid date of birth format. Must be YYYY");
    }

    // 2. Check Age Rules
    const birthYear = Number.parseInt(value);
    const age = currentYear - birthYear;

    if (age < 18) throw new Error("The User must be at least 18 years old!");
    if (age > 70) throw new Error("The User must be under 70 years old!");

    return new UserDateOfBirth(value);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}
