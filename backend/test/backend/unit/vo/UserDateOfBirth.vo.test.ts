import { defaultYear } from "../../../../src/Shared/constants/helperValue.constant";

export class UserDateOfBirth {
  constructor(private value: string) {
    if (!value) throw new Error("date of birth is required");
    const Dob = Number.parseInt(value);
    if (Number.isNaN(Dob)) throw new Error("the date of birth must be number");
    if (defaultYear - Dob < 18) {
      throw new Error("the student must be at least 18 !!");
    }
  }

  public getValue(): string {
    return this.value;
  }
}
    