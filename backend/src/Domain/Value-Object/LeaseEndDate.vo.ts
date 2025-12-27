import { currentYear } from "../../Shared/constants/validationZod.constant";

export class LeaseEndDate {
  // Constructor: Private value assignment, public access for Mappers
  constructor(private value?: string) {
    if (!value) {
      this.value = undefined;
      return;
    }

    // --- STRUCTURAL VALIDATION (Always Run) ---
    // 1. Basic Format
    if (value.length !== 10) {
      throw new Error("Invalid date length; it must be exactly 10 characters.");
    }

    if (!this.isValidDateFormat(value)) {
      throw new Error("Invalid date format. The correct format is DD-MM-YYYY.");
    }

    // 2. Parse Valid chunks
    const chunkDay = value.substring(0, 2);
    const chunkMonth = value.substring(3, 5);
    const chunkYear = value.substring(6, 10);

    // 3. Calendar Validity
    this.validateMonth(chunkMonth);
    this.validateDays(chunkDay, chunkMonth, chunkYear);

    // No business logic here (allows loading old/expired leases from DB)
  }

  // --- STATIC FACTORY (Strict Creation for New Input) ---
  public static create(value: string): LeaseEndDate {
    if (!value) throw new Error("Lease end date is required.");

    // 1. Create instance (Runs structural checks)
    const instance = new LeaseEndDate(value);

    // 2. Run Business Rules (Only for NEW leases)
    // Rule: Must be at least 1 month in the future
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

  private validateDays(dayStr: string, monthStr: string, yearStr: string): void {
    const day = Number.parseInt(dayStr);
    const month = Number.parseInt(monthStr);
    const year = Number.parseInt(yearStr);

    if (month === 2) {
      const maxDays = this.isLeapYear(year) ? 29 : 28;
      if (day > maxDays) {
        throw new Error(`February in ${year} has a maximum of ${maxDays} days.`);
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

    // 1. Year Check (Fail Fast)
    if (yearNum < currentYear) {
      throw new Error("End year must not be in the past.");
    }
    
    // 2. Logic Check (1 Month Minimum Duration)
    const inputDate = new Date(`${year}-${month}-${day}T00:00:00`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Thresholds
    const oneMonthAhead = new Date(today);
    oneMonthAhead.setMonth(today.getMonth() + 1);

    const eightYearsAhead = new Date(today);
    eightYearsAhead.setFullYear(today.getFullYear() + 8);

    if (inputDate < oneMonthAhead) {
      throw new Error("The lease end date must be at least one month from today.");
    }

    if (inputDate > eightYearsAhead) {
      throw new Error("The lease end date must not be more than 8 years ahead.");
    }
  }
}