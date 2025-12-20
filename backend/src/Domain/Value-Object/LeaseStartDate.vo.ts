import { currentYear } from "../../Shared/constants/validationZod.constant";

export class LeaseStartDate {
  constructor(private value: string) {
    if (value.length !== 10)
      throw new Error("Invalid date length; it must be exactly 10 characters.");

    if (!this.validationDateFormate(value)) {
      throw new Error("Invalid date format. The correct format is DD-MM-YYYY.");
    }

    // Parse the date into day, month, and year
    const chunkDay = value[0] + value[1];
    const chunkMonth = value[3] + value[4];
    const chunkYear = value[6] + value[7] + value[8] + value[9];

    // Validate the day, month, and year
    this.daysValidation(chunkDay, chunkMonth, chunkYear);
    this.monthValidation(chunkMonth);
    this.yearValidation(chunkYear);

    // Validate the overall date logic (e.g., today, 7 days rule)
    this.dateLogicValidation(chunkDay, chunkMonth, chunkYear);
  }

  public getValue(): string {
    return this.value;
  }

  public getDays() {
    const chunkDay = this.value[0] + this.value[1];
    return Number.parseInt(chunkDay);
  }

  public getMonth() {
    const chunkMonth = this.value[3] + this.value[4];
    return Number.parseInt(chunkMonth);
  }

  public getYear() {
    const chunkYear =
      this.value[6] + this.value[7] + this.value[8] + this.value[9];

    return Number.parseInt(chunkYear);
  }

  private validationDateFormate(value: string): boolean {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    return regex.test(value);
  }

  private isLeapYear(year: number): boolean {
    // Check if the year is a leap year
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
    return false;
  }

  private daysValidation(value: string, month: string, year: string): void {
    const dayNum = Number.parseInt(value);
    const monthNum = Number.parseInt(month);
    const yearNum = Number.parseInt(year);

    // Validate day range based on month
    if (monthNum === 2) {
      // February
      if (this.isLeapYear(yearNum)) {
        if (dayNum < 1 || dayNum > 29)
          throw new Error(
            "February in a leap year can have a maximum of 29 days."
          );
      } else {
        if (dayNum < 1 || dayNum > 28)
          throw new Error(
            "February in a non-leap year can have a maximum of 28 days."
          );
      }
    } else if ([4, 6, 9, 11].includes(monthNum)) {
      // Months with 30 days
      if (dayNum < 1 || dayNum > 30)
        throw new Error("This month can have a maximum of 30 days.");
    } else {
      // Months with 31 days
      if (dayNum < 1 || dayNum > 31)
        throw new Error("This month can have a maximum of 31 days.");
    }
  }

  private monthValidation(value: string): void {
    const monthNum = Number.parseInt(value);
    if (monthNum < 1 || monthNum > 12) {
      throw new Error("Invalid month; it must be between 1 and 12.");
    }
  }

  private yearValidation(value: string): void {
    const yearNum = Number.parseInt(value);
    if (yearNum < currentYear) {
      throw new Error("Year must not be in the past.");
    }
    if (yearNum > currentYear + 1) {
      throw new Error("Year must not be more than one year ahead.");
    }
  }

  // Validate if the date is between today and the next 7 days
  private dateLogicValidation(day: string, month: string, year: string): void {
    // Create a Date object from the given day, month, and year
    const inputDate = new Date(`${year}-${month}-${day}T00:00:00`); // Set time to 00:00:00

    // Get today's date and set the maximum allowed date (7 days from today)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to 00:00:00 to avoid time differences
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    // Check if the year is more than one year ahead
    const maxAllowedYear = today.getFullYear() + 1; // Allow max one year ahead
    if (inputDate.getFullYear() > maxAllowedYear) {
      throw new Error("Year must not be more than one year ahead.");
    }

    // Ensure the date is not in the past (at least today)
    if (inputDate < today) {
      throw new Error(
        "The date cannot be in the past. It must be today or later."
      );
    }

    // Ensure the date is not more than 7 days in the future
    if (inputDate > maxDate) {
      throw new Error("The date cannot be more than 7 days in the future.");
    }
  }
}
