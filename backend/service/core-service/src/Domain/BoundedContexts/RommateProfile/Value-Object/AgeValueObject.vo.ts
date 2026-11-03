export class Age {
  constructor(private readonly age: string) {}

  public static create(age: string) {
    if (!age || age.trim().length === 0) throw new Error("no age been set !!");

    const trimmed = age.trim();

    if (!/^\d+$/.test(trimmed)) {
      throw new Error("Age must be a whole number");
    }

    if (trimmed.length > 2)
      throw new Error("the min/max age can not be more that 2 digit");

    const ageNum = Number.parseInt(trimmed, 10);

    if (ageNum > 70) {
      throw new Error("the max age is for roommate student is 70");
    }

    if (ageNum < 18) {
      throw new Error("the mix age for roommate student is 18 ");
    }

    return new Age(age);
  }

  public isGreaterThan(other: Age): boolean {
    return Number(this.age) > Number(other.getValue());
  }

  public isLessThan(other: Age): boolean {
    return Number(this.age) < Number(other.getValue());
  }

  /**
   * Value Object Equality check.
   */
  public equals(other: Age): boolean {
    return this.age === other.getValue();
  }

  public getValue(): string {
    return this.age;
  }
}
