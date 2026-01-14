import { NumberOfRoom } from "../../../../src/Domain/BoundedContexts/Housing/Value-Object/NumberOfRoom.vo";

describe("NumberOfRoom Value Object", () => {
  
  //  White List (Valid)
  describe("White List (Success)", () => {
    test("should accept valid minimum rooms (1)", () => {
      const room = NumberOfRoom.create("1");
      expect(room.getValue()).toBe("1");
    });

    test("should accept valid maximum rooms (10)", () => {
      const room = NumberOfRoom.create("10");
      expect(room.getValue()).toBe("10");
    });

    test("should trim whitespace automatically", () => {
      const room = NumberOfRoom.create("  5  ");
      expect(room.getValue()).toBe("5");
    });
  });

  //  Black List (Invalid)
  describe("Black List (Failure)", () => {
    test("should throw if empty", () => {
      expect(() => NumberOfRoom.create("")).toThrow("required");
      expect(() => NumberOfRoom.create("   ")).toThrow("required");
    });

    test("should throw if input is not a number (e.g. 'abc')", () => {
      expect(() => NumberOfRoom.create("abc")).toThrow("whole number");
    });

    test("should throw if input is decimal (e.g. '1.5')", () => {
      expect(() => NumberOfRoom.create("1.5")).toThrow("whole number");
    });

    test("should throw if less than 1 (e.g. '0')", () => {
      expect(() => NumberOfRoom.create("0")).toThrow("at least 1");
    });

    test("should throw if greater than 10 (e.g. '11')", () => {
      expect(() => NumberOfRoom.create("11")).toThrow("at most 10");
    });
  });
});