import { LeaseEndDate } from "../../../../src/Domain/Value-Object/LeaseEndDate.vo";

describe("Lease End Date value object validation (Whitelist)", () => {
  describe("validate LeaseEndDate Object", () => {
    test("should create valid Lease End Date with start exactly 10 characters", () => {
      const input = "19-12-2025"; // Valid date
      const date = new LeaseEndDate(input);
      expect(date.getValue()).toBe(input);
    });

    test("should throw error if the date is less than one month ahead", () => {
      const today = new Date();
      const input = `${today.getDate()}-${
        today.getMonth() + 1
      }-${today.getFullYear()}`; // Today, so less than one month ahead
      expect(() => new LeaseEndDate(input)).toThrow(
        "The date must be at least one month ahead."
      );
    });

    test("should throw error for invalid year (more than 8 years ahead)", () => {
      const input = "22-12-2030"; // More than 8 years ahead
      expect(() => new LeaseEndDate(input)).toThrow(
        "The date must not be more than 8 years ahead."
      );
    });

    test("should allow a valid date one month ahead", () => {
      const today = new Date();
      const oneMonthAhead = new Date(today.setMonth(today.getMonth() + 1));
      const input = `${oneMonthAhead.getDate()}-${
        oneMonthAhead.getMonth() + 1
      }-${oneMonthAhead.getFullYear()}`;
      const date = new LeaseEndDate(input);
      expect(date.getValue()).toBe(input);
    });

    test("should allow a valid date up to 8 years ahead", () => {
      const today = new Date();
      const eightYearsAhead = new Date(
        today.setFullYear(today.getFullYear() + 8)
      );
      const input = `${eightYearsAhead.getDate()}-${
        eightYearsAhead.getMonth() + 1
      }-${eightYearsAhead.getFullYear()}`;
      const date = new LeaseEndDate(input);
      expect(date.getValue()).toBe(input);
    });
  });
});
