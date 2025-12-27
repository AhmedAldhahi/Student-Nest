export class MonthlyRent {
  constructor(private value?: string | undefined) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): MonthlyRent {
    if (value.length > 4) throw new Error("monthly rent at most 4 digit ");

    const digitValue = Number.parseInt(value, 10);

    if (digitValue < 1) throw new Error("the monthly rent must be at least 1 ");

    if (digitValue > 9999)
      throw new Error("the monthly rend must be at most 9999 ");

    return new MonthlyRent(value);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}
