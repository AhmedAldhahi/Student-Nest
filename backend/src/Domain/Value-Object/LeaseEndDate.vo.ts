import { currentYear } from "../../Shared/constants/validationZod.constant";

export class LeaseEndDate {
  // Allow value to be undefined for lenient loading
  constructor(private value?: string) {
    if (!value) {
      this.value = undefined;
      return;
    }

    // --- STRUCTURAL VALIDATION (Always Run) ---
    // 1. Basic Length & Format Check
    if (value.length !== 10) {
      throw new Error("Invalid date length; it must be exactly 10 characters.");
    }

    if (!this.validationDateFormate(value)) {
      throw new Error("Invalid date format. The correct format is DD-MM-YYYY.");
    }

    // 2. Parse Valid chunks
    const chunkDay = value.substring(0, 2);
    const chunkMonth = value.substring(3, 5);
    const chunkYear = value.substring(6, 10);

    // 3. Validate it is a Real Calendar Date
    this.monthValidation(chunkMonth);
    this.daysValidation(chunkDay, chunkMonth, chunkYear);

    // Note: We do NOT run 'dateLogicValidation' here.
    // We allow past/expired dates when loading from the DB.

    this.value = value;
  }

  // --- STATIC FACTORY (Strict Creation) ---
  public static create(value: string): LeaseEndDate {
    if (!value) throw new Error("Lease end date is required.");

    // 1. Create the object (Runs structural validation)
    const instance = new LeaseEndDate(value);

    // 2. Run Strict Business Rules (Only for NEW leases)
    // (e.g., Must be at least 1 month ahead)
    instance.validateBusinessRules();

    return instance;
  }

  // --- GETTERS ---

  public getValue(): string | undefined {
    return this.value;
  }

  public getDays(): number {
    if (!this.value) throw new Error("Value is undefined");
    return Number.parseInt(this.value.substring(0, 2));
  }

  public getMonth(): number {
    if (!this.value) throw new Error("Value is undefined");
    return Number.parseInt(this.value.substring(3, 5));
  }

  public getYear(): number {
    if (!this.value) throw new Error("Value is undefined");
    return Number.parseInt(this.value.substring(6, 10));
  }

  // --- VALIDATION LOGIC ---

  private validationDateFormate(value: string): boolean {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    return regex.test(value);
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  private daysValidation(
    dayStr: string,
    monthStr: string,
    yearStr: string
  ): void {
    const day = Number.parseInt(dayStr);
    const month = Number.parseInt(monthStr);
    const year = Number.parseInt(yearStr);

    if (month === 2) {
      const maxDays = this.isLeapYear(year) ? 29 : 28;
      if (day < 1 || day > maxDays) {
        throw new Error(
          `February in ${year} has a maximum of ${maxDays} days.`
        );
      }
    } else if ([4, 6, 9, 11].includes(month)) {
      if (day < 1 || day > 30) {
        throw new Error("This month can have a maximum of 30 days.");
      }
    } else {
      if (day < 1 || day > 31) {
        throw new Error("This month can have a maximum of 31 days.");
      }
    }
  }

  private monthValidation(value: string): void {
    const month = Number.parseInt(value);
    if (month < 1 || month > 12) {
      throw new Error("Invalid month; it must be between 1 and 12.");
    }
  }

  // --- STRICT BUSINESS RULES (Called by Factory) ---

  private validateBusinessRules(): void {
    if (!this.value) return;

    const day = this.value.substring(0, 2);
    const month = this.value.substring(3, 5);
    const year = this.value.substring(6, 10);
    const yearNum = Number.parseInt(year);

    // 1. Year Check
    if (yearNum < currentYear) {
      // Logic check: Can a lease end in the past?
      // For *creation*, usually no. For loading, yes.
      // Since this is ONLY called by .create(), we forbid it.
      throw new Error("End year must not be in the past.");
    }
    if (yearNum > currentYear + 8) {
      throw new Error("End year must not be more than 8 years ahead.");
    }

    // 2. Logic Check (1 Month Ahead)
    // Parse to ISO for Date Object
    const inputDate = new Date(`${year}-${month}-${day}T00:00:00`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate thresholds
    const oneMonthAhead = new Date(today);
    oneMonthAhead.setMonth(today.getMonth() + 1);

    const eightYearsAhead = new Date(today);
    eightYearsAhead.setFullYear(today.getFullYear() + 8);

    // Ensure the date is at least one month in the future
    if (inputDate < oneMonthAhead) {
      throw new Error(
        "The lease end date must be at least one month from today."
      );
    }

    // Ensure the date is not more than 8 years in the future
    if (inputDate > eightYearsAhead) {
      throw new Error(
        "The lease end date must not be more than 8 years ahead."
      );
    }
  }
}
