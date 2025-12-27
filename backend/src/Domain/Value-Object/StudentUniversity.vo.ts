import { universitiesAndCollege } from "../../Shared/constants/unversityAndCollage.constant";

export class StudentUniversity {
  private constructor(private readonly value?: string) {
    if (!value) this.value = undefined;
  }

  public static create(value: string): StudentUniversity {
    // 1. Trim first, then check if empty
    const trimmedInput = value ? value.trim() : "";

    if (!trimmedInput || trimmedInput.length === 0) {
      throw new Error("University Name is required");
    }

    // 2. Flatten the search: Look through all cities in the data structure
    const dataSources = universitiesAndCollege[0];
    let foundMatch: string | null = null;

    for (const city in dataSources) {
      const universitiesInCity = dataSources[city];

      const match = universitiesInCity.find((uni) => {
        if (uni.name.toLowerCase() === trimmedInput.toLowerCase()) return true;

        if (
          uni.shortName &&
          uni.shortName.toLowerCase() === trimmedInput.toLowerCase()
        ) {
          return true;
        }

        return false;
      });

      if (match) {
        foundMatch = match.name;
        break; 
      }
    }

    if (!foundMatch) {
      throw new Error(
        `Invalid University: "${trimmedInput}" is not in our approved list.`
      );
    }

    return new StudentUniversity(foundMatch);
  }

  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}