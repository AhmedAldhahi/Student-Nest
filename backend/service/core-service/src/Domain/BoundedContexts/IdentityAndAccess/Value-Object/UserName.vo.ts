export class UserName {
  constructor(private value?: string | undefined) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): UserName {
    if (!value) throw new Error("user name is required !!");

    const trimmed = value.trim();

    if (trimmed.length < 3) {
      throw new Error("User name is too short or null");
    }

    if (trimmed.length > 25) {
      throw new Error("UserName must be at most 25 characters long.");
    }

    // Regex:
    // ^[A-Za-z]                 => must start with a letter
    // [A-Za-z0-9_]*             => letters, digits, underscores in first word
    // (?: [A-Za-z0-9_]+)?$      => optional single space followed by letters/digits/underscores
    if (!/^[A-Za-z][A-Za-z0-9_]*(?: [A-Za-z0-9_]+)?$/.test(trimmed)) {
      throw new Error(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
    }

    return new UserName(trimmed);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}
