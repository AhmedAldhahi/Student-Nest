import { LeaseStartDate } from "./LeaseStartDate.vo";
import { LeaseEndDate } from "./LeaseEndDate.vo";

export class LeaseTerm {
  private difDays: number;
  private difMonth: number;
  private difYear: number;

  constructor(startDate: LeaseStartDate, endDate: LeaseEndDate) {
    if (!startDate || !endDate) {
      throw new Error("Start and end date for lease are required.");
    } 

    // Initialize date objects
    const start = new Date(
      startDate.getYear(),
      startDate.getMonth(),
      startDate.getDays()
    );
    const end = new Date(
      endDate.getYear(),
      endDate.getMonth(),
      endDate.getDays()
    );

    if (end < start) {
      throw new Error("End date cannot be before start date.");
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust for negative days (borrowing from the previous month)
    if (days < 0) {
      months -= 1;
      // Get the last day of the previous month
      const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += previousMonth.getDate();
    }

    // Adjust for negative months (borrowing from the year)
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    this.difYear = years;
    this.difMonth = months;
    this.difDays = days;
  }

  public getValue(): string {
    return `Day: ${this.difDays}, Month: ${this.difMonth}, Year: ${this.difYear}`;
  }
}
