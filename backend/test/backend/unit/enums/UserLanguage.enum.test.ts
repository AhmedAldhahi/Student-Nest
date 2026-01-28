import { UserLanguage } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/UserLanguage.enum";

describe("User language enum ", () => {
  test("should have 'Arabic' value", () => {
    expect(UserLanguage.Arabic).toBe("Arabic");
  });

  test("should have 'English' value", () => {
    expect(UserLanguage.English).toBe("English");
  });

  test("should list all possible enum value", () => {
    const statuses = Object.values(UserLanguage);
    expect(statuses).toEqual(["Arabic", "English"]);
  });
});
