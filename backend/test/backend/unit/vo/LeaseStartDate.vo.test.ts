import { LeaseStartDate } from "../../../../src/Domain/Value-Object/LeaseStartDate.vo";

describe("Lease Start Date value object validation", () => {
  describe("validate LeaseStartDate Object", () => {
    test("should create valid Lease Start Date with start exactly 10 ", () => {
      const input = "19-12-2025";
      const date = new LeaseStartDate(input);
      expect(date.getValue()).toBe(input);
    });
  });

  test("should create valid lease at at least today ", () => {
    const input = "19-12-2025";
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });

  test("should create valid start day between 1 and 28/29/30/31", () => {
    const input = "22-12-2025";
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });

  test("should create valid start month between 1 and 12 ", () => {
    const input = "22-12-2025";
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });

  test("should create valid year formate between this year and year +1", () => {
    const input = "22-12-2025";
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });

  test("should allow February 29th in a leap year", () => {
    const input = "29-02-2024"; // Leap year
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });


});

  test("should throw error for invalid day for February in non-leap year", () => {
    const input = "29-02-2023"; // Invalid date, 2023 is not a leap year
    expect(() => new LeaseStartDate(input)).toThrow(
      "February in a non-leap year can have a maximum of 28 days."
    );
  });

  test("should allow day 30 in a month with 30 days (April)", () => {
    const input = "30-04-2025"; // Valid date, April has 30 days
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });

  test("should throw error for day 31 in a month with only 30 days (April)", () => {
    const input = "31-04-2025"; // Invalid date, April has only 30 days
    expect(() => new LeaseStartDate(input)).toThrow(
      "This month can have a maximum of 30 days."
    );
  });

  test("should allow day 31 in a month with 31 days (January)", () => {
    const input = "31-01-2025"; // Valid date, January has 31 days
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });

  test("should throw error for invalid month (13)", () => {
    const input = "22-13-2025"; // Invalid month (13 is out of range)
    expect(() => new LeaseStartDate(input)).toThrow(
      "Invalid month; it must be between 1 and 12."
    );
  });

  test("should throw error for invalid year (in the past)", () => {
    const input = "22-12-2020"; // Invalid year (2020 is in the past)
    expect(() => new LeaseStartDate(input)).toThrow(
      "Year must not be in the past."
    );
  });

  test("should create valid year format between this year and next year", () => {
    const input = "22-12-2025"; // Valid year (next year)
    const date = new LeaseStartDate(input);
    expect(date.getValue()).toBe(input);
  });

  test("should throw error for year more than one year ahead", () => {
    const input = "22-12-2026"; // Invalid year (more than one year ahead)
    expect(() => new LeaseStartDate(input)).toThrow(
      "The date cannot be more than 7 days in the future."
    );
  });
