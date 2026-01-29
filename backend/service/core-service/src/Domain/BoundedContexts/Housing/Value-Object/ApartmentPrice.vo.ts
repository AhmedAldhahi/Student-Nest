export class ApartmentPrice {
  // Public constructor allows Mappers to load data without re-validation
  constructor(private price?: string | undefined) {
    if (!price || price.trim().length === 0) {
      this.price = undefined;
    }
  }

  public static create(price: string): ApartmentPrice {
    // 1. Check Required
    if (!price || price.trim().length === 0) {
      throw new Error("Apartment price is required");
    }

    const trimmed = price.trim();

    // 2. Strict Numeric Check (Fixing the Number.isNaN bug)
    // This regex ensures only digits are allowed (no letters, no symbols)
    if (!/^\d+$/.test(trimmed)) {
      throw new Error("Apartment price value must be a whole number");
    }

    const priceNum = Number.parseInt(trimmed, 10);

    // 3. Range Checks
    if (priceNum < 1) {
      throw new Error("Apartment price must be at least 1 JD");
    }

    // Fixed logic: The error said 9999, so I updated the check to 9999.
    // If you actually meant 999, change this to > 999.
    if (priceNum > 9999) {
      throw new Error("Apartment price must be at most 9999 JD");
    }

    return new ApartmentPrice(trimmed);
  }

  public getValue(): string | undefined {
    return this.price ?? undefined;
  }
}