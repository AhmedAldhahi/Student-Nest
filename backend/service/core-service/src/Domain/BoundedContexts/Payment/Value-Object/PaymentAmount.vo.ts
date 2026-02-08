export class PaymentAmount {
  // Make constructor private to force usage of static create()
  private constructor(private readonly amount: string) {}

  public static create(amount: string): PaymentAmount {
    if (!amount || amount.trim().length === 0) {
      throw new Error("Payment amount is required.");
    }

    const trimmed = amount.trim();

    if (!/^-?\d+(\.\d{1,2})?$/.test(trimmed)) {
      throw new Error("Payment amount must be a valid number");
    }

    const val = Number.parseFloat(trimmed);

    if (val <= 0) {
      throw new Error("Payment amount must be greater than zero.");
    }

    return new PaymentAmount(trimmed);
  }

  public getValue(): string {
    return this.amount;
  }
}
