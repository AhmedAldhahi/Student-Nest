import { PaymentAmount } from "../../../../src/Domain/BoundedContexts/Payment/Value-Object/PaymentAmount.vo";

describe("PaymentAmount Value Object", () => {
  describe("Success cases", () => {
    test("should create a valid payment amount from a clean string", () => {
      const amount = PaymentAmount.create("100");
      expect(amount.getValue()).toBe("100");
    });

    test("should handle decimal values up to 2 places", () => {
      const amount = PaymentAmount.create("99.99");
      expect(amount.getValue()).toBe("99.99");
    });

    test("should trim whitespace from the input", () => {
      const amount = PaymentAmount.create("  50.5  ");
      expect(amount.getValue()).toBe("50.5");
    });
  });

  describe("Validation Failures", () => {
    test("should throw error if amount is empty", () => {
      expect(() => PaymentAmount.create("")).toThrow(
        "Payment amount is required.",
      );
    });

    test("should throw error if amount is only whitespace", () => {
      expect(() => PaymentAmount.create("   ")).toThrow(
        "Payment amount is required.",
      );
    });

    test("should throw error if amount is not a valid number format", () => {
      expect(() => PaymentAmount.create("abc")).toThrow(
        "Payment amount must be a valid number",
      );
      expect(() => PaymentAmount.create("10.555")).toThrow(
        "Payment amount must be a valid number",
      );
    });

    test("should throw error if amount is zero", () => {
      expect(() => PaymentAmount.create("0")).toThrow(
        "Payment amount must be greater than zero.",
      );
    });

    test("should throw error if amount is negative", () => {
      expect(() => PaymentAmount.create("-10")).toThrow(
        "Payment amount must be greater than zero.",
      );
    });
  });
});
