export class RentTerm {
  constructor(private value?: string | undefined) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): RentTerm {
    if (!value) throw new Error("rent term is require !!");

    this.validate(value);

    return new RentTerm(value);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }

  private static validate(term: string): void {
    // 1. Format Check: DD,MM,YY (comma separated as per your comment example)
    // or DD-MM-YY? I will support both separators just in case.
    const regex = /^(\d{2})[-/.,](\d{2})[-/.,](\d{2})$/;
    const match = term.match(regex);

    if (!match) {
      throw new Error(
        `Invalid format. Expected DD,MM,YY (e.g., 01,01,01), got: ${term}`
      );
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // 2. Year Validation (01 - 08)
    if (year < 1 || year > 8) {
      throw new Error(`Invalid year: ${year}. Must be between 01 and 08.`);
    }

    // 3. Month Validation (01 - 12)
    if (month < 1 || month > 12) {
      throw new Error(`Invalid month: ${month}. Must be between 01 and 12.`);
    }

    // 4. Day Validation (01 - 30)
    // Your comment specifically says "first 01 from 01-30"
    if (day < 1 || day > 30) {
      throw new Error(`Invalid day: ${day}. Must be between 01 and 30.`);
    }
  }
}
