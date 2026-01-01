import { currentYear } from "../../../../Shared/constants/validationZod.constant";

export class LeaseStartDate {
  // Constructor: Private so we control creation.
  // 'private value' automatically assigns the property.
  constructor(private value?: string) {
    if (!value) {
      this.value = undefined;
      return; // Stop here if empty
    }

    // --- STRUCTURAL VALIDATION (Always Run: DB & User) ---

    // 1. Basic Format
    if (value.length !== 10) {
      throw new Error("Invalid date length; it must be exactly 10 characters.");
    }

    if (!this.isValidDateFormat(value)) {
      throw new Error("Invalid date format. The correct format is DD-MM-YYYY.");
    }

    // 2. Extract Parts
    const chunkDay = value.substring(0, 2);
    const chunkMonth = value.substring(3, 5);
    const chunkYear = value.substring(6, 10);

    // 3. Calendar Validity (e.g. Feb 30 check)
    this.validateMonth(chunkMonth);
    this.validateDays(chunkDay, chunkMonth, chunkYear);

    // Valid structurally? Good. We stop here.
    // We DO NOT check "7 days rule" here to allow loading old leases from DB.
  }

  // --- STATIC FACTORY (Strict Creation for New Input) ---
  public static create(value: string): LeaseStartDate {
    if (!value) throw new Error("Lease start date is required.");

    // 1. Create instance (Runs structural checks)
    const instance = new LeaseStartDate(value);

    // 2. Run Business Rules (Only for NEW data)
    instance.validateBusinessRules();

    return instance;
  }

  // --- GETTERS ---
  public getValue(): string | undefined {
    return this.value;
  }

  public getDays(): number {
    return Number.parseInt(this.value!.substring(0, 2));
  }

  public getMonth(): number {
    return Number.parseInt(this.value!.substring(3, 5));
  }

  public getYear(): number {
    return Number.parseInt(this.value!.substring(6, 10));
  }

  // --- INTERNAL HELPERS ---

  private isValidDateFormat(value: string): boolean {
    return /^(\d{2})-(\d{2})-(\d{4})$/.test(value);
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  private validateMonth(value: string): void {
    const month = Number.parseInt(value);
    if (month < 1 || month > 12) {
      throw new Error("Invalid month; it must be between 1 and 12.");
    }
  }

  private validateDays(
    dayStr: string,
    monthStr: string,
    yearStr: string
  ): void {
    const day = Number.parseInt(dayStr);
    const month = Number.parseInt(monthStr);
    const year = Number.parseInt(yearStr);

    if (month === 2) {
      const maxDays = this.isLeapYear(year) ? 29 : 28;
      if (day > maxDays) {
        throw new Error(
          `February in ${year} has a maximum of ${maxDays} days.`
        );
      }
    } else if ([4, 6, 9, 11].includes(month)) {
      if (day > 30) {
        throw new Error("This month can have a maximum of 30 days.");
      }
    } else {
      if (day > 31) {
        throw new Error("This month can have a maximum of 31 days.");
      }
    }
  }

  private validateBusinessRules(): void {
    if (!this.value) return;

    const day = this.value.substring(0, 2);
    const month = this.value.substring(3, 5);
    const year = this.value.substring(6, 10);
    const yearNum = Number.parseInt(year);

    // 1. Global Sanity Check (Year)
    // Note: The 7-day rule below is strictly tighter than this, but this is a good fail-safe.
    if (yearNum < currentYear) {
      throw new Error("cannot be in the past");
    }

    // 2. Strict 7-Day Window Logic
    const inputDate = new Date(`${year}-${month}-${day}T00:00:00`);

    // Normalize "Today" to start of day (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    if (inputDate < today) {
      throw new Error("The lease start date cannot be in the past.");
    }

    if (inputDate > maxDate) {
      throw new Error(
        "The lease start date cannot be more than 7 days in the future."
      );
    }
  }
}
