import { UserEmail } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo";

describe("validate UserEmail value object", () => {
  describe("Valid UserEmail", () => {
    test("must have a valid email format and a minimum length of 10 characters", () => {
      const input = "test@example.com";
      const userEmail = UserEmail.create(input);
      expect(userEmail.getValue()).toBe(input);
    });
  });

  describe("Invalid UserEmail", () => {
    describe("invalid format", () => {
      test("missing @", () => {
        expect(() => UserEmail.create("testexample.com"))
          .toThrow("A valid email is required.");
      });

      test("missing dot", () => {
        expect(() => UserEmail.create("test@com"))
          .toThrow("A valid email is required.");
      });

      test("spaces in email", () => {
        expect(() => UserEmail.create("test @example.com"))
          .toThrow("A valid email is required.");
      });
    });

    describe("invalid length", () => {
      test("less than 10 characters", () => {
        expect(() => UserEmail.create("a@b.c"))
          .toThrow("A valid email is required.");
      });

      test("empty email", () => {
        expect(() => UserEmail.create(""))
          .toThrow("A valid email is required.");
      });
    });
  });
});
