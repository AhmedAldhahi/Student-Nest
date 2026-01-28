import { SharingLevel } from "../../../../src/Domain/BoundedContexts/RommateProfile/Enum/SharingLevel.enum";

describe("Sharing Level enum", () => {
  test("should have 'strictly_private' value", () => {
    expect(SharingLevel.STRICTLY_PRIVATE).toBe("strictly_private");
  });

  test("should have 'ask_first' value", () => {
    expect(SharingLevel.ASK_FIRST).toBe("ask_first");
  });

  test("should have 'open_sharing' value", () => {
    expect(SharingLevel.OPEN_SHARING).toBe("open_sharing");
  });

  test("should list all possible enum values", () => {
    const levels = Object.values(SharingLevel);
    expect(levels).toEqual(["strictly_private", "ask_first", "open_sharing"]);
  });
});
