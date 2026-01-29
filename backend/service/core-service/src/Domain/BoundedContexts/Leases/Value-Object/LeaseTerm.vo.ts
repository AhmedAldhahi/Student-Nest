import { LeaseStartDate } from "./LeaseStartDate.vo";
import { LeaseEndDate } from "./LeaseEndDate.vo";

export class LeaseTerm {
  constructor(private value?: string | undefined) {
    if (!value) this.value = undefined;
  }

  public static create(
    startDate: LeaseStartDate,
    endDate: LeaseEndDate
  ): LeaseTerm {
    if (!startDate || !endDate) {
      throw new Error("Start and end date for lease are required.");
    }

    const start = new Date(startDate.getYear(), startDate.getMonth() - 1, startDate.getDays());
    const end = new Date(endDate.getYear(), endDate.getMonth() - 1, endDate.getDays());

    if (end < start) {
      throw new Error("End date cannot be before start date.");
    }

    // 1. Calculate tentative total months
    let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    // 2. Adjust if the end day is less than the start day
    // (Meaning we haven't completed the full last month yet)
    if (end.getDate() < start.getDate()) {
        totalMonths--;
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    // 3. Calculate remaining days securely
    // We create a temporary date: "Start Date + Calculated Years & Months"
    const intermediateDate = new Date(start);
    intermediateDate.setFullYear(start.getFullYear() + years);
    intermediateDate.setMonth(start.getMonth() + months);

    // JavaScript auto-corrects date overflow here (e.g., Jan 30 + 1 month -> Feb 28 or 29)
    // Now we just count the exact milliseconds difference for the remaining days
    const oneDayMs = 24 * 60 * 60 * 1000;
    const diffTime = Math.abs(end.getTime() - intermediateDate.getTime());
    const days = Math.round(diffTime / oneDayMs);

    const calculatedString = `${years} Year(s), ${months} Month(s), ${days} Day(s)`;

    return new LeaseTerm(calculatedString);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}