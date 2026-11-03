import { RentTerm } from "../../../../src/Domain/BoundedContexts/Leases/Value-Object/RentTerm.vo";

describe("RentTerm Value Object", () => {
  // White List (Valid)
  describe("White List (Success)", () => {
    test("should accept standard format (DD,MM,YY)", () => {
      const term = RentTerm.create("01,06,01"); // 1 Day, 6 Months, 1 Year
      expect(term.getValue()).toBe("01-06-01");
    });

    test("should accept single digits and normalize them (1,1,1 -> 01-01-01)", () => {
      const term = RentTerm.create("1,1,1");
      expect(term.getValue()).toBe("01-01-01");
    });

    test("should accept dashes or dots as separators", () => {
      const term = RentTerm.create("01-06-01");
      expect(term.getValue()).toBe("01-06-01");
    });

    test("should allow 0 years (e.g. 6 months rental)", () => {
      const term = RentTerm.create("00,06,00");
      expect(term.getValue()).toBe("00-06-00");
    });
  });

  // Black List (Invalid)
  describe("Black List (Failure)", () => {
    test("should throw if format is garbage", () => {
      expect(() => RentTerm.create("Hello World")).toThrow(
        "Invalid rent term format",
      );
    });

    test("should throw if day > 30", () => {
      expect(() => RentTerm.create("31,01,01")).toThrow("Invalid day");
    });

    test("should throw if month > 12", () => {
      expect(() => RentTerm.create("01,13,01")).toThrow("Invalid month");
    });

    test("should throw if year > 8", () => {
      expect(() => RentTerm.create("01,01,09")).toThrow("Invalid year");
    });

    test("should throw if total duration is zero", () => {
      expect(() => RentTerm.create("00,00,00")).toThrow("cannot be zero");
    });

    test("should throw if values are negative", () => {
      expect(() => RentTerm.create("-1,01,01")).toThrow(
        "Invalid rent term format",
      );
    });

    test("should throw if value is empty", () => {
      expect(() => RentTerm.create("")).toThrow("Rent term is required");
    });

    test("should throw if value is only whitespace", () => {
      expect(() => RentTerm.create("   ")).toThrow("Rent term is required");
    });
  });
});
