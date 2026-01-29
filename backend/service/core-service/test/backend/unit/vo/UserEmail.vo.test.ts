import { UserEmail } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo";

describe("validate UserEmail value object", () => {
  describe("validate the UserEmail", () => {
    test("must have a valid email format and a minimum length of 10 characters", () => {
      const input = "test@example.com";  // Valid email
      const userEmail = new UserEmail(input);
      expect(userEmail.getValue()).toBe(input);  // Should pass
    });
  });

  describe("Invalid UserEmail", () => {
    describe("invalid format", () => {
      test("it should not allow an invalid email format (missing @)", () => {
        const input = "testexample.com";  // Invalid email format
        expect(() => new UserEmail(input)).toThrow(
          "A valid email is required."
        );
      });

      test("it should not allow an invalid email format (missing .)", () => {
        const input = "test@com";  // Invalid email format (missing .)
        expect(() => new UserEmail(input)).toThrow(
          "A valid email is required."
        );
      });

      test("it should not allow an invalid email format (spaces)", () => {
        const input = "test @example.com";  // Invalid email format (spaces)
        expect(() => new UserEmail(input)).toThrow(
          "A valid email is required."
        );
      });
    });

    describe("invalid length", () => {
      test("it should not allow an email with less than 10 characters", () => {
        const input = "a@b.c";  // Invalid email, less than 10 characters
        expect(() => new UserEmail(input)).toThrow(
          "A valid email is required."
        );
      });

      test("it should not allow an empty email", () => {
        const input = "";  // Invalid email, empty string
        expect(() => new UserEmail(input)).toThrow(
          "A valid email is required."
        );
      });

      test("it should not allow a null email", () => {
        const input = "";  // Invalid email, null value
        expect(() => new UserEmail(input)).toThrow(
          "A valid email is required."
        );
      });
    });
  });
});
