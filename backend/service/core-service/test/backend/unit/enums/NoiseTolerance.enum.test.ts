import { NoiseTolerance } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/Noise tolerance.enum";

describe("Noise Tolerance enum", () => {
  test("should have 'Low' value", () => {
    expect(NoiseTolerance.Low).toBe("Low");
  });

  test("should have 'Medium' value", () => {
    expect(NoiseTolerance.Medium).toBe("Medium");
  });

  test("should have 'High' value", () => {
    expect(NoiseTolerance.High).toBe("High");
  });

  test("should list all possible enum values", () => {
    const levels = Object.values(NoiseTolerance);
    expect(levels).toEqual(["Low", "Medium", "High"]);
  });
});
