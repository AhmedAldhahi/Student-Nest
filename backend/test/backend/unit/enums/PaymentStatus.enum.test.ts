import { PaymentStatus } from "../../../../src/Domain/BoundedContexts/Payment/Enum/PaymentStatus.enum";

describe("Payment Status enum", () => {
  test("should have 'UnPaid' value", () => {
    expect(PaymentStatus.UnPaid).toBe("UnPaid");
  });

  test("should have 'Paid' value", () => {
    expect(PaymentStatus.Paid).toBe("Paid");
  });

  test("should list all possible enum values", () => {
    const statuses = Object.values(PaymentStatus);
    expect(statuses).toEqual(["UnPaid", "Paid"]);
  });
});
