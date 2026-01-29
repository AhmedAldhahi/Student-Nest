import { PetPreference } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/PetPreference.enum";

describe("Pet Preference enum", () => {
  test("should have 'has_pet' value", () => {
    expect(PetPreference.HAS_PET).toBe("has_pet");
  });

  test("should have 'loves_pets' value", () => {
    expect(PetPreference.LOVES_PETS).toBe("loves_pets");
  });

  test("should have 'tolerates_pets' value", () => {
    expect(PetPreference.TOLERATES_PETS).toBe("tolerates_pets");
  });

  test("should have 'prefer_no_pets' value", () => {
    expect(PetPreference.PREFER_NO_PETS).toBe("prefer_no_pets");
  });

  test("should have 'allergic_phobic' value", () => {
    expect(PetPreference.ALLERGIC_PHOBIC).toBe("allergic_phobic");
  });

  test("should list all possible enum values", () => {
    const preferences = Object.values(PetPreference);
    expect(preferences).toEqual([
      "has_pet",
      "loves_pets",
      "tolerates_pets",
      "prefer_no_pets",
      "allergic_phobic",
    ]);
  });
});
