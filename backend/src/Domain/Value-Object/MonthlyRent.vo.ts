export class MonthlyRent {
  // Public constructor allows Mappers to reconstitute data without validation
  constructor(private value?: string | undefined) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): MonthlyRent {
    // 1. Check if exists
    if (!value || value.trim().length === 0) {
      throw new Error("Monthly rent is required");
    }

    const trimmed = value.trim();

    // 2. Strict Numeric Check (Prevents "100abc" or "12.5")
    if (!/^\d+$/.test(trimmed)) {
      throw new Error("Monthly rent must be a whole number");
    }

    const digitValue = Number.parseInt(trimmed, 10);

    // 3. Range Checks
    if (digitValue < 1) {
      throw new Error("Monthly rent must be at least 1");
    }

    if (digitValue > 9999) {
      throw new Error("Monthly rent must be at most 9999");
    }

    return new MonthlyRent(trimmed);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}