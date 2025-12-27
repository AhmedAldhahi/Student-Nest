export class NumberOfRoom {
  // Private constructor for Reconstitution
   constructor(private readonly numOfRoom?: string | undefined) {
    if (!numOfRoom) this.numOfRoom = undefined;
  }

  public static create(numOfRooms: string): NumberOfRoom {
    // 1. Check Empty
    if (!numOfRooms || numOfRooms.trim().length === 0) {
      throw new Error("Number of rooms is required");
    }

    const trimmed = numOfRooms.trim();

    // 2. Check is Numeric (Fixing the Number.isInteger bug)
    // ^\d+$ ensures it is only digits (no decimals like 1.5, no letters)
    if (!/^\d+$/.test(trimmed)) {
      throw new Error("The number of rooms must be a whole number");
    }

    const value = parseInt(trimmed, 10);

    // 3. Range Check (1 - 10)
    if (value < 1) {
      throw new Error("The number of rooms must be at least 1");
    }

    if (value > 10) {
      throw new Error("The number of rooms must be at most 10");
    }

    return new NumberOfRoom(trimmed);
  }

  public getValue(): string | undefined {
    return this.numOfRoom ?? undefined;
  }
}