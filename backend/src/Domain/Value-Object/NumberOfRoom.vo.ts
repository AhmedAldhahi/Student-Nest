export class NumberOfRoom {
  constructor(private numOfRoom?: string | undefined) {
    if (!numOfRoom || numOfRoom.trim().length === 0) {
      this.numOfRoom = undefined;
    }
  }

  public static create(numOfRooms: string): NumberOfRoom {
    if (!numOfRooms || numOfRooms.trim().length === 0) {
      throw new Error("number of room is require !!");
    }

    if (Number.isNaN(numOfRooms)) {
      throw new Error("the type must be number !!");
    }

    const numOfRoomsNum = Number.parseInt(numOfRooms);

    if (numOfRoomsNum < 1) throw new Error("the number of room at lease 1");

    if (numOfRoomsNum >= 10) throw new Error("the number of room at most 10");

    return new NumberOfRoom(numOfRoomsNum.toString());
  }

  public getValue(): string | undefined {
    return this.numOfRoom ?? undefined;
  }
}
