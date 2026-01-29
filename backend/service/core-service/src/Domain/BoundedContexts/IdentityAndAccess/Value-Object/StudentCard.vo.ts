export class StudentCard {
  // Public constructor for Mapper (Reconstitution)
  constructor(private readonly value?: string | undefined) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: string): StudentCard {
    if (!value || value.trim().length === 0) {
      throw new Error("Student card ID is required");
    }

    const trimmed = value.trim();

    // 1. Fix: Use Regex to check for digits only
    // Number.isInteger("123") returns false!
    const isNumeric = /^\d+$/.test(trimmed);

    if (!isNumeric) {
      throw new Error("Student card ID must contain only numbers");
    }

    // 2. Length Check
    if (trimmed.length < 8) {
      throw new Error("Student card ID must be at least 8 digits");
    }

    return new StudentCard(trimmed);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}