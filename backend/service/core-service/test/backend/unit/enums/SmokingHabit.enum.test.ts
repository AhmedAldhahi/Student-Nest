import { SmokingHabit } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/SmokingHabit.enum";

describe("Smoking habit enum", () => {
  test("it must have a 'NON_SMOKER', value ", () => {
    expect(SmokingHabit.NON_SMOKER).toBe("NON_SMOKER");
  });

  test("it must have 'OUTDOOR_ONLY', value", () => {
    expect(SmokingHabit.OUTDOOR_ONLY).toBe("OUTDOOR_ONLY");
  });

  test("it must have a 'INDOOR_ALLOWED' value", () => {
    expect(SmokingHabit.INDOOR_ALLOWED).toBe("INDOOR_ALLOWED");
  });

  test("it must have a 'VAPE_HOOKAH' value", () => {
    expect(SmokingHabit.VAPE_HOOKAH).toBe("VAPE_HOOKAH");
  });

  test("should list all possible enum value", () => {
    const statuses = Object.values(SmokingHabit);
    expect(statuses).toEqual([
      "NON_SMOKER",
      "OUTDOOR_ONLY",
      "INDOOR_ALLOWED",
      "VAPE_HOOKAH",
    ]);
  });
});
