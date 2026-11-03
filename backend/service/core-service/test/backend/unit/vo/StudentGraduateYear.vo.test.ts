import { studentGraduateYear } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentGraduateYear.vo";
import { currentYear } from "../../../../src/Shared/constants/validationZod.constant";

describe("StudentGraduateYear Value Object", () => {
  
  describe("White List (Success)", () => {
    test("should accept the current year", () => {
      const year = studentGraduateYear.create(currentYear);
      expect(year.getValue()).toBe(currentYear);
    });

    test("should accept a valid future year (e.g. next year)", () => {
      const nextYear = currentYear + 1;
      const year = studentGraduateYear.create(nextYear);
      expect(year.getValue()).toBe(nextYear);
    });
  });

  describe("Black List (Failure)", () => {
    test("should throw if year is in the past", () => {
      const pastYear = currentYear - 1;
      expect(() => studentGraduateYear.create(pastYear)).toThrow("past");
    });

    test("should throw if year is too far in the future (e.g. +20 years)", () => {
      const farFuture = currentYear + 20;
      expect(() => studentGraduateYear.create(farFuture)).toThrow("cannot be further than");
    });

    test("should throw if value is decimal", () => {
      expect(() => studentGraduateYear.create(2026.5)).toThrow("whole number");
    });

    test("should throw if value is zero or empty", () => {
      expect(() => studentGraduateYear.create(0)).toThrow("required");
    });
  });
});