import { NumberOfBed } from "../../../../src/Domain/Modules/Housing/Value-Object/NumberOfBed.vo";

describe("NumberOfBed Value Object", () => {
  
  //  White List (Valid)
  describe("White List (Success)", () => {
    test("should accept valid number '1'", () => {
      const bed = NumberOfBed.create("1");
      expect(bed.getValue()).toBe("1");
    });

    test("should accept valid number '10'", () => {
      const bed = NumberOfBed.create("10");
      expect(bed.getValue()).toBe("10");
    });

    test("should trim whitespace", () => {
      const bed = NumberOfBed.create("  2  ");
      expect(bed.getValue()).toBe("2");
    });
  });

  //  Black List (Failure)
  describe("Black List (Failure)", () => {
    test("should throw if empty", () => {
      expect(() => NumberOfBed.create("")).toThrow("required");
    });

    test("should throw if not a number", () => {
      expect(() => NumberOfBed.create("abc")).toThrow("whole number");
    });

    test("should throw if less than 1", () => {
      expect(() => NumberOfBed.create("0")).toThrow("at least 1");
    });

    test("should throw if greater than 10", () => {
      expect(() => NumberOfBed.create("11")).toThrow("at most 10");
    });
  });
});