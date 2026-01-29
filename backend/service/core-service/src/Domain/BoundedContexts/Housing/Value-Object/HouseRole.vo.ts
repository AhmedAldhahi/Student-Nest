export class HouseRule {
  constructor(private readonly value: string) {}

  public static create(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("the house rule is require !!");
    }

    const trimmed = value.trim();

    if (trimmed.length > 255) {
      throw new Error("The house rule cannot exceed 255 characters.");
    }

    return new HouseRule(trimmed);
  }

  public getValue(): string {
    return this.value;
  }
}
