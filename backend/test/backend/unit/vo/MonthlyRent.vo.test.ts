import { MonthlyRent } from "../../../../src/Domain/Value-Object/MonthlyRent.vo";

describe("MonthlyRent Value Object", () => {
  
  // Valid Cases
  describe("Success Cases", () => {
    test("should accept valid rent '100'", () => {
      const rent = MonthlyRent.create("100");
      expect(rent.getValue()).toBe("100");
    });

    test("should accept max rent '9999'", () => {
      const rent = MonthlyRent.create("9999");
      expect(rent.getValue()).toBe("9999");
    });

    test("should accept min rent '1'", () => {
      const rent = MonthlyRent.create("1");
      expect(rent.getValue()).toBe("1");
    });

    test("should trim whitespace ' 500 ' -> '500'", () => {
      const rent = MonthlyRent.create(" 500 ");
      expect(rent.getValue()).toBe("500");
    });
  });

  // Invalid Cases
  describe("Failure Cases", () => {
    test("should throw if empty", () => {
      expect(() => MonthlyRent.create("")).toThrow("required");
      expect(() => MonthlyRent.create("   ")).toThrow("required");
    });

    test("should throw if non-numeric (e.g. '100jd')", () => {
      expect(() => MonthlyRent.create("100jd")).toThrow("whole number");
    });

    test("should throw if decimal (e.g. '100.50')", () => {
      expect(() => MonthlyRent.create("100.50")).toThrow("whole number");
    });

    test("should throw if zero (0)", () => {
      expect(() => MonthlyRent.create("0")).toThrow("at least 1");
    });

    test("should throw if negative (-100)", () => {
      expect(() => MonthlyRent.create("-100")).toThrow("whole number"); // Regex fails first on '-'
    });

    test("should throw if greater than 9999", () => {
      expect(() => MonthlyRent.create("10000")).toThrow("at most 9999");
    });
  });
});