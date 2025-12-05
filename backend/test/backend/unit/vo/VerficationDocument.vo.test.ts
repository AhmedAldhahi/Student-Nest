import { VerificationDocument } from "../../../../src/Core/value-object/VerficationDocument.vo";

describe("validate StudentVerificationDocument value object", () => {
  describe("valid document", () => {
    test("should accept valid document", () => {
      const input = "verification-document.pdf";  // Valid document
      const document = new VerificationDocument(input);
      expect(document.getValue()).toBe(input);  // Should pass
    });
  });

  describe("Invalid document", () => {
    test("should throw an error if the document is empty", () => {
      const input = "";  // Invalid, empty document
      expect(() => new VerificationDocument(input)).toThrow(
        "validate document is required !!"
      );
    });

    test("should throw an error if the document is null", () => {
      const input = "";  // Invalid, null document
      expect(() => new VerificationDocument(input)).toThrow(
        "validate document is required !!"
      );
    });
  });
});
