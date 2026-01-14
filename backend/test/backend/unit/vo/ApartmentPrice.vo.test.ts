import { ApartmentPrice } from "../../../../src/Domain/BoundedContexts/Housing/Value-Object/ApartmentPrice.vo";

describe("ApartmentPrice Value Object", () => {
  //  Valid Cases
  describe("White List (Success)", () => {
    test("should accept valid price '150'", () => {
      const price = ApartmentPrice.create("150");
      expect(price.getValue()).toBe("150");
    });

    test("should accept min price '1'", () => {
      const price = ApartmentPrice.create("1");
      expect(price.getValue()).toBe("1");
    });

    test("should accept max price '9999'", () => {
      const price = ApartmentPrice.create("9999");
      expect(price.getValue()).toBe("9999");
    });

    test("should trim whitespace", () => {
      const price = ApartmentPrice.create("  200  ");
      expect(price.getValue()).toBe("200");
    });
  });

  //  Invalid Cases
  describe("Black List (Failure)", () => {
    test("should throw if empty", () => {
      expect(() => ApartmentPrice.create("")).toThrow("required");
    });

    test("should throw if not a number (e.g. '100jd')", () => {
      expect(() => ApartmentPrice.create("100jd")).toThrow("whole number");
    });

    test("should throw if decimal (e.g. '150.5')", () => {
      expect(() => ApartmentPrice.create("150.5")).toThrow("whole number");
    });

    test("should throw if 0 or negative", () => {
      expect(() => ApartmentPrice.create("0")).toThrow("at least 1");
      expect(() => ApartmentPrice.create("-50")).toThrow("whole number");
    });

    test("should throw if too high (> 9999)", () => {
      expect(() => ApartmentPrice.create("10000")).toThrow("at most 9999");
    });
  });
});
