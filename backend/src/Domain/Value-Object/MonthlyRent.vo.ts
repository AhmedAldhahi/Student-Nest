export class MonthlyRent {
  constructor(private value: string) {
    if (value.length > 4) throw new Error("monthly rent at most 4 digit ");

    const digitValue = Number.parseInt(value);

    if (digitValue < 1) throw new Error("the monthly rent must be at least 1 ");

    if (digitValue > 9999)
      throw new Error("the monthly rend must be at most 9999 ");
  }

  public getValue(): string {
    return this.value;
  }
}
