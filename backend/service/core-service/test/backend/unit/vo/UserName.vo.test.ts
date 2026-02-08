import { UserName } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo";

describe("UserName value object validation", () => {

  describe("Valid user names", () => {
    test("should allow a simple name without spaces", () => {
      const input = "Ali";
      const userName = UserName.create(input);
      expect(userName.getValue()).toBe(input);
    });

    test("should allow a name with one space between words", () => {
      const input = "Ali Ahmad";
      const userName = UserName.create(input);
      expect(userName.getValue()).toBe(input);
    });

    test("should allow underscores and numbers after first letter", () => {
      const input = "Ali_3";
      const userName = UserName.create(input);
      expect(userName.getValue()).toBe(input);
    });

    test("should allow name of maximum 25 characters", () => {
      const input = "A".repeat(25);
      const userName = UserName.create(input);
      expect(userName.getValue()).toBe(input);
    });
  });

  describe("Invalid user names", () => {
    test("should not allow names shorter than 3 characters", () => {
      expect(() => UserName.create("Al")).toThrow("User name is too short or null");
    });

    test("should not allow empty or null names", () => {
      expect(() => UserName.create("")).toThrow("user name is required !!");
    });

    test("should not allow names starting with non-letter", () => {
      expect(() => UserName.create("3Ali")).toThrow(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
      expect(() => UserName.create("_Ali")).toThrow(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
    });

    test("should not allow names with more than 25 characters", () => {
      expect(() => UserName.create("A".repeat(26))).toThrow(
        "UserName must be at most 25 characters long."
      );
    });

    test("should not allow multiple consecutive spaces", () => {
      expect(() => UserName.create("Ali  Ahmad")).toThrow(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
      expect(() => UserName.create("Ali   Ahmad")).toThrow(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
    });

    test("should not allow more than one space in the middle", () => {
      expect(() => UserName.create("Ali Ahmad Majed")).toThrow(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
    });

    test("should not allow symbols in the name", () => {
      expect(() => UserName.create("Ali!")).toThrow(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
    });

    test("should not allow name with only numbers", () => {
      expect(() => UserName.create("123")).toThrow(
        "Name must start with a letter, can contain letters, numbers, underscores, and at most one space between words"
      );
    });
  });
});
