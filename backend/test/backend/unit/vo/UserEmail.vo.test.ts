export class UserEmail {
  constructor(private value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value) || value.trim().length < 10) {
      throw new Error("A valid email is required.");
    }
  }

  public getValue(): string {
    return this.value;
  }
}
