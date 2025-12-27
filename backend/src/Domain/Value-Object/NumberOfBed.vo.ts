export class numberOfBed {
  constructor(private numOfBed?: string | undefined) {
    if (!numOfBed || numOfBed.trim().length === 0) {
      this.numOfBed = undefined;
    }
  }

  public static create(numOfBed: string): numberOfBed {
    if (!numOfBed || numOfBed.trim().length === 0) {
      throw new Error("number of bed is require !!");
    }

    const trimmed = numOfBed.trim();

     if (!/^\d+$/.test(trimmed)) {
      throw new Error("The number of rooms must be a whole number");
    }

    if (Number.isNaN(numOfBed)) {
      throw new Error("number of bed must be number !!");
    }

    const numOfBedNum = Number.parseInt(numOfBed);

    if (numOfBedNum < 1)
      throw new Error("the number of bed must be at lease 1 ");

    if (numOfBedNum > 10) {
      throw new Error(" the number of bed must be at most 10 ");
    }

    return new numberOfBed(numberOfBed.toString());
  }

  public getValue(): string | undefined {
    return this.numOfBed ?? undefined;
  }
}
