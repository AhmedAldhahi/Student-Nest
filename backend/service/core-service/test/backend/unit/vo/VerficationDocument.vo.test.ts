import { VerificationDocument } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";

describe("validate StudentVerificationDocument value object", () => {
  describe("valid document", () => {
    test("should accept valid document", () => {
      const input = "verification-document.pdf";  // Valid document
      const document =  VerificationDocument.create(input);
      expect(document.getValue()).toBe(input);  // Should pass
    });
  });

  describe("Invalid document", () => {
    test("should throw an error if the document is empty", () => {
      const input = "";  // Invalid, empty document
      expect(() =>  VerificationDocument.create(input)).toThrow(
        "validate document is required !!"
      );
    });

    test("should throw an error if the document is null", () => {
      const input = "";  // Invalid, null document
      expect(() =>  VerificationDocument.create(input)).toThrow(
        "validate document is required !!"
      );
    });
  });
});
