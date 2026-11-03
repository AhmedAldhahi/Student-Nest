import { GuestPolicy } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/GuestPolicy.enum";

describe("Guest Policy enum", () => {
  test("should have 'no_guests' value", () => {
    expect(GuestPolicy.NO_GUESTS).toBe("no_guests");
  });

  test("should have 'weekends_only' value", () => {
    expect(GuestPolicy.WEEKENDS_ONLY).toBe("weekends_only");
  });

  test("should have 'frequent_guests' value", () => {
    expect(GuestPolicy.FREQUENT_GUESTS).toBe("frequent_guests");
  });

  test("should have 'study_partners' value", () => {
    expect(GuestPolicy.STUDY_PARTNERS).toBe("study_partners");
  });

  test("should list all possible enum values", () => {
    const policies = Object.values(GuestPolicy);
    expect(policies).toEqual([
      "no_guests",
      "weekends_only",
      "frequent_guests",
      "study_partners",
    ]);
  });
});
