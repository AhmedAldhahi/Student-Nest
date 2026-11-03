import { GovernmentID } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";

describe("validate Government id value object", () => {
  describe("validate the Government id", () => {
    test("must have 10 digits exactly", () => {
      const input = "1234567890";
      const govId = GovernmentID.create(input);
      expect(govId.getValue()).toBe(input); // Should pass
    });
  });

  describe("Invalid Government Id", () => {
    describe("invalid digit size", () => {
      test("the digit is less than 10 digits", () => {
        const input = "123456789"; // Invalid ID, less than 10 digits
        expect(() => GovernmentID.create(input)).toThrow(
          "User Government ID number must be exactly 10 digits.",
        );
      });

      test("the digit is more than 10 digits", () => {
        const input = "123456789101112"; // Invalid ID, more than 10 digits
        expect(() => GovernmentID.create(input)).toThrow(
          "User Government ID number must be exactly 10 digits.",
        );
      });
    });

    describe("invalid characters", () => {
      test("it should not allow special characters", () => {
        const input = "1234@67890"; // Invalid ID, contains special character '@'
        expect(() => GovernmentID.create(input)).toThrow(
          "User Government ID number must contain only numeric digits.",
        );
      });

      test("it should not allow alphabetic characters", () => {
        const input = "1234A67890"; // Invalid ID, contains alphabetic character 'A'
        expect(() => GovernmentID.create(input)).toThrow(
          "User Government ID number must contain only numeric digits.",
        );
      });

      test("it should not allow spaces", () => {
        const input = "123 456789"; // Invalid ID, contains a space
        expect(() => GovernmentID.create(input)).toThrow(
          "User Government ID number must contain only numeric digits.",
        );
      });
    });

    describe("invalid format", () => {
      test("it should not allow negative numbers", () => {
        const input = "-1234567890"; // Invalid ID, contains a negative sign
        expect(() => GovernmentID.create(input)).toThrow(
          "Negative numbers are not allowed.",
        );
      });

      test("it should not allow leading zeros", () => {
        const input = "0123456789"; // Invalid ID, starts with a leading zero
        expect(() => GovernmentID.create(input)).toThrow(
          "User Government ID cannot start with a leading zero.",
        );
      });
    });
  });
});

/**
 * No special characters, no alphabetic characters.
 * No negative numbers allowed.
 * No leading zeros.
 * Exactly 10 digits, no more, no less.
 */
