import { DietaryPreference } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/DietaryPreference.enum";

describe("Dietary Preference enum", () => {
  test("should have 'omnivore' value", () => {
    expect(DietaryPreference.OMNIVORE).toBe("omnivore");
  });

  test("should have 'vegetarian' value", () => {
    expect(DietaryPreference.VEGETARIAN).toBe("vegetarian");
  });

  test("should have 'vegan' value", () => {
    expect(DietaryPreference.VEGAN).toBe("vegan");
  });

  test("should list all possible enum values", () => {
    const preferences = Object.values(DietaryPreference);
    expect(preferences).toEqual(["omnivore", "vegetarian", "vegan"]);
  });
});
