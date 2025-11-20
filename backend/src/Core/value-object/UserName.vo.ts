export class UserName {
  constructor(private userName: string) {
    if (!userName) {
      throw new Error("User name is required");
    }
    const trimmed = userName.trim();

    if (trimmed.length < 3) {
      throw new Error("User name is too short");
    }

    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(trimmed)) {
      throw new Error(
        "Name must start with a letter and can only contain letters, numbers, or underscores, no spaces allowed"
      );
    }
  }

  public getValue(): string {
    return this.userName;
  }
}
