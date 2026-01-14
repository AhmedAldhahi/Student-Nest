import { PaymentAmount } from "../../../../src/Domain/BoundedContexts/Payment/Value-Object/PaymentAmount.vo";

describe("PaymentAmount Value Object", () => {
  it("should create a valid payment amount with a whole number", () => {
    const amountStr = "100";
    const payment = PaymentAmount.create(amountStr);

    expect(payment).toBeDefined();
    expect(payment.getValue()).toBe("100");
  });

  it("should create a valid payment amount with decimals", () => {
    const amountStr = "100.50";
    const payment = PaymentAmount.create(amountStr);

    expect(payment.getValue()).toBe("100.50");
  });

  it("should trim whitespace from the input", () => {
    const amountStr = "  500  ";
    const payment = PaymentAmount.create(amountStr);

    expect(payment.getValue()).toBe("500");
  });

  it("should throw an error if amount is empty", () => {
    expect(() => {
      PaymentAmount.create("");
    }).toThrow("Payment amount is required.");
  });

  it("should throw an error if amount is only whitespace", () => {
    expect(() => {
      PaymentAmount.create("   ");
    }).toThrow("Payment amount is required.");
  });

  it("should throw an error for non-numeric strings", () => {
    expect(() => {
      PaymentAmount.create("abc");
    }).toThrow("Payment amount must be a valid number");
  });

  it("should throw an error for mixed text and numbers", () => {
    expect(() => {
      PaymentAmount.create("100usd");
    }).toThrow("Payment amount must be a valid number");
  });

  it("should throw an error for negative numbers", () => {
    // Note: The regex /^\d.../ usually catches the '-' symbol as invalid format immediately
    expect(() => {
      PaymentAmount.create("-50");
    }).toThrow();
  });

  it("should throw an error if amount is zero", () => {
    // Zero matches the regex /^\d+$/, so it passes the format check but fails the logic check (val <= 0)
    expect(() => {
      PaymentAmount.create("0");
    }).toThrow("Payment amount must be greater than zero.");
  });

  it("should throw an error if amount is 0.00", () => {
    expect(() => {
      PaymentAmount.create("0.00");
    }).toThrow("Payment amount must be greater than zero.");
  });

  // Optional: If you enforced the 2 decimal place regex
  it("should throw an error for invalid decimal precision (e.g. 3 places)", () => {
    expect(() => {
      PaymentAmount.create("10.999");
    }).toThrow("Payment amount must be a valid number");
  });
});
