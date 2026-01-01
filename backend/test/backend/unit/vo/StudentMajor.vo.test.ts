import { StudentMajor } from "../../../../src/Domain/Modules/Student/Value-Object/StudentMajor.vo";

describe("StudentMajor Value Object", () => {
  //  White List (Valid)
  describe("White List (Success)", () => {
    test("should accept simple major", () => {
      const major = StudentMajor.create("Computer Science");
      expect(major.getValue()).toBe("Computer Science");
    });

    test("should accept major with special characters (& - .)", () => {
      // Common examples in universities
      expect(StudentMajor.create("Banking & Finance").getValue()).toBe(
        "Banking & Finance"
      );
      expect(StudentMajor.create("Pre-Med").getValue()).toBe("Pre-Med");
      expect(StudentMajor.create("M.I.S").getValue()).toBe("M.I.S");
    });

    test("should trim whitespace automatically", () => {
      const major = StudentMajor.create("   Software Engineering   ");
      expect(major.getValue()).toBe("Software Engineering");
    });
  });

  //  Black List (Invalid)
  describe("Black List (Failure)", () => {
    test("should throw if empty", () => {
      expect(() => StudentMajor.create("")).toThrow("required");
      expect(() => StudentMajor.create("   ")).toThrow("required");
    });

    test("should throw if contains numbers", () => {
      expect(() => StudentMajor.create("CS 101")).toThrow("Invalid major");
    });

    test("should throw if contains invalid special chars (@, !, #)", () => {
      expect(() => StudentMajor.create("Computer @ Science")).toThrow(
        "Invalid major"
      );
    });

    test("should throw if multiple spaces between words", () => {
      // The regex (?: [A-Za-z]+) ensures only single spaces are allowed
      expect(() => StudentMajor.create("Computer  Science")).toThrow(
        "Invalid major"
      );
    });
  });
});
