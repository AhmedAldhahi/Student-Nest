import { Age } from "../../../../src/Domain/BoundedContexts/RommateProfile/Value-Object/AgeValueObject.vo";

describe("Age Value Object", () => {
  describe("Success cases", () => {
    test("should create a valid age within the range (18-70)", () => {
      const age = Age.create("22");
      expect(age.getValue()).toBe("22");
    });

    test("should accept the minimum allowed age (18)", () => {
      const age = Age.create("18");
      expect(age.getValue()).toBe("18");
    });

    test("should accept the maximum allowed age (70)", () => {
      const age = Age.create("70");
      expect(age.getValue()).toBe("70");
    });
  });

  describe("Validation Failures", () => {
    test("should throw error if age is empty or whitespace", () => {
      expect(() => Age.create("")).toThrow("no age been set !!");
      expect(() => Age.create("  ")).toThrow("no age been set !!");
    });

    test("should throw error if age is more than 2 digits", () => {
      expect(() => Age.create("100")).toThrow(
        "the min/max age can not be more that 2 digit",
      );
    });

    test("should throw error if age is not a whole number", () => {
      expect(() => Age.create("20.5")).toThrow("Age must be a whole number");
      expect(() => Age.create("20a")).toThrow("Age must be a whole number");
    });

    test("should throw error if age is greater than 70", () => {
      expect(() => Age.create("71")).toThrow(
        "the max age is for roommate student is 70",
      );
    });

    test("should throw error if age is less than 18", () => {
      expect(() => Age.create("17")).toThrow(
        "the mix age for roommate student is 18 ",
      );
    });
  });

  describe("Comparison Logic", () => {
    const younger = Age.create("20");
    const older = Age.create("25");
    const sameAsYounger = Age.create("20");

    test("isGreaterThan should return true correctly", () => {
      expect(older.isGreaterThan(younger)).toBe(true);
      expect(younger.isGreaterThan(older)).toBe(false);
    });

    test("isLessThan should return true correctly", () => {
      expect(younger.isLessThan(older)).toBe(true);
      expect(older.isLessThan(younger)).toBe(false);
    });

    test("equals should verify value equality", () => {
      expect(younger.equals(sameAsYounger)).toBe(true);
      expect(younger.equals(older)).toBe(false);
    });
  });
});
