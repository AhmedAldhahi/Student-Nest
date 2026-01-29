import { universitiesAndCollege } from "../../../../Shared/constants/unversityAndCollage.constant";

export class StudentUniversity {
  // Private constructor for Reconstitution
   constructor(private readonly value?: string) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): StudentUniversity {
    // 1. Validate Input
    const trimmedInput = value ? value.trim() : "";

    if (!trimmedInput || trimmedInput.length === 0) {
      throw new Error("University Name is required");
    }

    // 2. Search in the Simple String Array
    // We look for a case-insensitive match
    const match = universitiesAndCollege.find(
      (uni) => uni.toLowerCase() === trimmedInput.toLowerCase()
    );

    if (!match) {
      throw new Error(
        `Invalid University: "${trimmedInput}" is not in our approved list.`
      );
    }

    // 3. Return the OFFICIAL name found in the list (to normalize capitalization)
    return new StudentUniversity(match);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}