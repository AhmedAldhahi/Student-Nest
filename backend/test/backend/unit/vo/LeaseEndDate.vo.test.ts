import { LeaseEndDate } from "../../../../src/Domain/Value-Object/LeaseEndDate.vo";

// Mock constant if needed
jest.mock("../../../../src/Shared/constants/validationZod.constant", () => ({
  currentYear: 2025
}));

describe("LeaseEndDate Value Object", () => {
  
  beforeAll(() => {
    // ❄️ FREEZE TIME: January 1st, 2025
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:00:00"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // ======================================================
  // 1. VALID SCENARIOS
  // ======================================================
  describe("Happy Path", () => {
    test("should accept exactly 1 month from now (2025-02-01)", () => {
      // 1 Jan -> 1 Feb is valid
      const date = LeaseEndDate.create("01-02-2025");
      expect(date.getValue()).toBe("01-02-2025");
    });

    test("should accept next year (2026-01-01)", () => {
      const date = LeaseEndDate.create("01-01-2026");
      expect(date.getValue()).toBe("01-01-2026");
    });
  });

  // ======================================================
  // 2. BUSINESS RULE FAILURES
  // ======================================================
  describe("Business Rule Failures", () => {
    test("should throw if date is in the PAST", () => {
      expect(() => LeaseEndDate.create("31-12-2024")).toThrow("must not be in the past");
    });

    test("should throw if date is TOO SOON (< 1 month)", () => {
      // It is Jan 1st. Trying to end lease on Jan 15th.
      // Logic: A lease usually needs to be at least 1 month.
      expect(() => LeaseEndDate.create("15-01-2025")).toThrow("at least one month");
    });

    test("should throw if date is > 8 years ahead", () => {
      expect(() => LeaseEndDate.create("01-01-2035")).toThrow("more than 8 years");
    });
  });

  // ======================================================
  // 3. STRUCTURAL FAILURES
  // ======================================================
  describe("Structural Failures", () => {
    test("should throw on invalid format", () => {
      expect(() => LeaseEndDate.create("2025/01/01")).toThrow("Invalid date format");
    });

    test("should throw on invalid calendar day (Feb 30)", () => {
      expect(() => LeaseEndDate.create("30-02-2025")).toThrow("maximum of 28 days");
    });
  });
});