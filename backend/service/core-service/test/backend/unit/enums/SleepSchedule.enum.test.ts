import { SleepSchedule } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/SleepSchedule.enum";

describe("Sleep Schedule enum", () => {
  test("should have 'early' value", () => {
    expect(SleepSchedule.Early).toBe("Early");
  });

  test("should have 'Late' value", () => {
    expect(SleepSchedule.Late).toBe("Late");
  });

  test("should have 'Flexible' value", () => {
    expect(SleepSchedule.Flexible).toBe("Flexible");
  });

  test("should list all possible enum value", () => {
    const statuses = Object.values(SleepSchedule);
    expect(statuses).toEqual(["Early", "Late", "Flexible"]);
  });
});
