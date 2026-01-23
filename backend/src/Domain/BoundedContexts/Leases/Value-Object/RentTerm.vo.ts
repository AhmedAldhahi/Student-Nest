export class RentTerm {
  constructor(private value?: string) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: string): RentTerm {
    if (!value || value.trim().length === 0) {
      throw new Error("Rent term is required");
    }

    // if (value.trim().length !== 8) {
    //   throw new Error("the rent term must be exactly 8 digit ");
    // }

    const instance = new RentTerm(value.trim());

    instance.validateStructure();

    instance.validateBusinessRules();

    instance.normalizeValue();

    return instance;
  }

  // --- GETTERS ---
  public getValue(): string | undefined {
    return this.value;
  }

  private validateStructure(): void {
    const val = this.value!;

    const regex = /^(\d{1,2})[-/.,](\d{1,2})[-/.,](\d{1,2})$/;

    if (!regex.test(val)) {
      throw new Error(
        `Invalid rent term format. Expected "DD,MM,YY" (e.g., "00,06,01" for 1 yr, 6 mos). Got: ${val}`,
      );
    }
  }

  private validateBusinessRules(): void {
    const { day, month, year } = this.parseValues();

    if (day < 0 || day > 30) {
      throw new Error(`Invalid day: ${day}. Must be between 0 and 30.`);
    }
    if (month < 0 || month > 12) {
      throw new Error(`Invalid month: ${month}. Must be between 0 and 12.`);
    }
    if (year < 0 || year > 8) {
      throw new Error(`Invalid year: ${year}. Must be between 0 and 8.`);
    }

    if (day === 0 && month === 0 && year === 0) {
      throw new Error("Rent term cannot be zero duration.");
    }
  }

  private normalizeValue(): void {
    const { day, month, year } = this.parseValues();

    this.value = `${this.pad(day)}-${this.pad(month)}-${this.pad(year)}`;
  }

  private parseValues(): { day: number; month: number; year: number } {
    const parts = this.value!.split(/[-/.,]/);
    return {
      day: parseInt(parts[0], 10),
      month: parseInt(parts[1], 10),
      year: parseInt(parts[2], 10),
    };
  }

  private pad(num: number): string {
    return num.toString().padStart(2, "0");
  }
}
