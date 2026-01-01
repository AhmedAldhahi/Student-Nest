import { LeaseStartDate } from "../../../../src/Domain/Modules/Leases/Value-Object/LeaseStartDate.vo";

// For this test, let's assume currentYear is 2025.
jest.mock("../../../../src/Shared/constants/validationZod.constant", () => ({
  currentYear: 2025,
}));

describe("LeaseStartDate Value Object", () => {
  beforeAll(() => {
    //  FREEZE TIME: January 1st, 2025
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:00:00"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // ======================================================
  // 1. VALID SCENARIOS (Business Rules Pass)
  // ======================================================
  describe("Happy Path (Business Rules)", () => {
    test("should accept 'Today' (2025-01-01)", () => {
      const date = LeaseStartDate.create("01-01-2025");
      expect(date.getValue()).toBe("01-01-2025");
    });

    test("should accept '7 Days from Now' (2025-01-08)", () => {
      const date = LeaseStartDate.create("08-01-2025");
      expect(date.getValue()).toBe("08-01-2025");
    });
  });

  // ======================================================
  // 2. BUSINESS RULE FAILURES (Strict Checks)
  // ======================================================
  describe("Business Rule Failures", () => {
    test("should throw if date is in the PAST (Yesterday)", () => {
      // Input: Dec 31, 2024 (Yesterday relative to frozen time)
      expect(() => LeaseStartDate.create("31-12-2024")).toThrow(
        "cannot be in the past"
      );
    });

    test("should throw if date is > 7 days in future", () => {
      // Input: Jan 9, 2025 (8 days from Jan 1)
      expect(() => LeaseStartDate.create("09-01-2025")).toThrow(
        "more than 7 days"
      );
    });
  });

  // ======================================================
  // 3. STRUCTURAL FAILURES (Format/Calendar)
  // ======================================================
  describe("Structural Failures", () => {
    test("should throw on invalid format (YYYY-MM-DD)", () => {
      expect(() => LeaseStartDate.create("2025-01-01")).toThrow(
        "Invalid date format"
      );
    });

    test("should throw on invalid day (Feb 30)", () => {
      expect(() => LeaseStartDate.create("30-02-2025")).toThrow(
        "maximum of 28 days"
      );
    });

    test("should handle Leap Year correctly (Feb 29, 2024)", () => {
      // Note: 2024 is past, so .create() would fail business rule.
      // But we can test via 'new LeaseStartDate' to check structure ONLY.

      const date = new LeaseStartDate("29-02-2024"); // Leap year
      expect(date.getValue()).toBe("29-02-2024");

      expect(() => new LeaseStartDate("30-02-2024")).toThrow(
        "maximum of 29 days"
      );
    });
  });
});
