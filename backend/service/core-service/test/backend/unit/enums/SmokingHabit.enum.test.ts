import { SmokingHabit } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/SmokingHabit.enum";

describe("Smoking habit enum", () => {
  test("it must have a 'NON_SMOKER' value", () => {
    expect(SmokingHabit.NON_SMOKER).toBe("non_smoker");
  });

  test("it must have 'OUTDOOR_ONLY' value", () => {
    expect(SmokingHabit.OUTDOOR_ONLY).toBe("outdoor_only");
  });

  test("it must have 'INDOOR_ALLOWED' value", () => {
    expect(SmokingHabit.INDOOR_ALLOWED).toBe("indoor_allowed");
  });

  test("it must have a 'VAPE_HOOKAH' value", () => {
    expect(SmokingHabit.VAPE_HOOKAH).toBe("vape_hookah");
  });

  test("should list all possible enum value", () => {
    const statuses = Object.values(SmokingHabit);
    expect(statuses).toEqual([
      "non_smoker",
      "outdoor_only",
      "indoor_allowed",
      "vape_hookah",
    ]);
  });
});
