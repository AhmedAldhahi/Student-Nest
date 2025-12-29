export class NumberOfBed {
  // Public constructor so Mappers can use it
  constructor(private numOfBed?: string | undefined) {
    if (!numOfBed || numOfBed.trim().length === 0) {
      this.numOfBed = undefined;
    }
  }

  public static create(numOfBed: string): NumberOfBed {
    if (!numOfBed || numOfBed.trim().length === 0) {
      throw new Error("Number of beds is required");
    }

    const trimmed = numOfBed.trim();

    // 1. Regex: Ensure it is a whole number (digits only)
    if (!/^\d+$/.test(trimmed)) {
      throw new Error("Number of beds must be a whole number");
    }

    // 2. Parse to Number for range checks
    const val = Number.parseInt(trimmed, 10);

    // 3. Range Checks
    if (val < 1) {
      throw new Error("Number of beds must be at least 1");
    }

    if (val > 10) {
      throw new Error("Number of beds must be at most 10");
    }

    // 4. Return the trimmed STRING value
    return new NumberOfBed(trimmed);
  }

  public getValue(): string | undefined {
    return this.numOfBed ?? undefined;
  }
}