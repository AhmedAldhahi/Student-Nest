import { StudentCard } from "../../../../src/Domain/Modules/Student/Value-Object/StudentCard.vo";

describe("StudentCard Value Object", () => {
  //  White List (Valid)
  describe("White List (Success)", () => {
    test("should accept valid 8-digit number string", () => {
      const input = "20210001";
      const card = StudentCard.create(input);
      expect(card.getValue()).toBe(input);
    });

    test("should accept valid long number string (>8 digits)", () => {
      const input = "2021098765";
      const card = StudentCard.create(input);
      expect(card.getValue()).toBe(input);
    });

    test("should automatically trim whitespace", () => {
      const card = StudentCard.create("  20251111  ");
      expect(card.getValue()).toBe("20251111");
    });
  });

  //  Black List (Invalid)
  describe("Black List (Failure)", () => {
    test("should throw if empty", () => {
      expect(() => StudentCard.create("")).toThrow("required");
      expect(() => StudentCard.create("   ")).toThrow("required");
    });

    test("should throw if contains letters", () => {
      expect(() => StudentCard.create("2021abcd")).toThrow("only numbers");
    });

    test("should throw if contains special characters", () => {
      expect(() => StudentCard.create("2021-001")).toThrow("only numbers");
    });

    test("should throw if length is less than 8", () => {
      expect(() => StudentCard.create("1234567")).toThrow("at least 8 digits");
    });
  });
});
