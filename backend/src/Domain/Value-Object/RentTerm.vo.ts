export class RentTerm {
  // Private constructor for Reconstitution
   constructor(private readonly value?: string) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): RentTerm {
    if (!value || value.trim().length === 0) {
      throw new Error("Rent term is required");
    }

    const trimmed = value.trim();

    // 1. Format Check:
    // Allows "01,01,01" OR "1,1,1"
    // Separators allowed: comma (,), dash (-), dot (.), slash (/)
    const regex = /^(\d{1,2})[-/.,](\d{1,2})[-/.,](\d{1,2})$/;
    const match = trimmed.match(regex);

    if (!match) {
      throw new Error(
        `Invalid format. Expected DD,MM,YY (e.g., 01,06,01). Got: ${trimmed}`
      );
    }

    // Parse values (Base 10)
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // 2. Business Rules
    
    // Day: 0 to 30 (Assuming 0 days is allowed if months > 0)
    if (day < 0 || day > 30) {
      throw new Error(`Invalid day: ${day}. Must be between 0 and 30.`);
    }

    // Month: 0 to 12
    if (month < 0 || month > 12) {
      throw new Error(`Invalid month: ${month}. Must be between 0 and 12.`);
    }

    // Year: 0 to 8 (Allowed 0 for short-term rentals)
    if (year < 0 || year > 8) {
      throw new Error(`Invalid year: ${year}. Must be between 0 and 8.`);
    }

    // Logical Check: The total duration cannot be 0,0,0
    if (day === 0 && month === 0 && year === 0) {
      throw new Error("Rent term cannot be zero duration.");
    }

    // Reconstruct the standardized format "DD,MM,YY" (e.g., convert 1,1,1 to 01,01,01)
    const formatted = `${day.toString().padStart(2, '0')},${month.toString().padStart(2, '0')},${year.toString().padStart(2, '0')}`;

    return new RentTerm(formatted);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}