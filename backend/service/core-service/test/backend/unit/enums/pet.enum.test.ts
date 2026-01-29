import { PetType } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/pet.enum";

describe("Pet Type enum", () => {
  test("should have 'cat' value", () => {
    expect(PetType.CAT).toBe("cat");
  });

  test("should have 'bird' value", () => {
    expect(PetType.BIRD).toBe("bird");
  });

  test("should have 'hamster' value", () => {
    expect(PetType.HAMSTER).toBe("hamster");
  });

  test("should have 'reptile' value", () => {
    expect(PetType.REPTILE).toBe("reptile");
  });

  test("should have 'other' value", () => {
    expect(PetType.OTHER).toBe("other");
  });

  test("should list all possible enum values", () => {
    const types = Object.values(PetType);
    expect(types).toEqual(["cat", "bird", "hamster", "reptile", "other"]);
  });
});
