export class StudentCard {
  constructor(private value: string) {
    if (!value) throw new Error("student card is required");
    const trimmed = value.trim();
    if (trimmed.length < 8) {
      throw new Error("Invalid student card id ");
    }
  }

  public getValue(): string {
    return this.value;
  }
}
