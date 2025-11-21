export class userPhoneNumber {
  constructor(private value: string) {
    if (!value) throw new Error("Phone number is required");

    const trimmed = value.trim();

    const phoneRegex = /^(?:\+?[1-9]\d{1,14}|(?:\+9627|009627|07)[7-9]\d{7})$/;

    if (!phoneRegex.test(trimmed)) {
      throw new Error(
        "Invalid phone number. Use international format (+[country code][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX)."
      );
    }
  }

  public getValue(): string {
    return this.value;
  }
}
