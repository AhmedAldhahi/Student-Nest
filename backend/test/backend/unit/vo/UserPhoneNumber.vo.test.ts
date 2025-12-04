import { userPhoneNumber } from "../../../../src/Core/value-object/UserPhoneNumber.vo";

describe("userPhoneNumber value object", () => {
  describe("validate create object", () => {
    test("should create valid Jordanian phone number in local format, 079XXXXXXXX", () => {
      const input = "0797774077"; // Valid local format
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordanian phone number in local formate , 078XXXXXXX", () => {
      const input = "0787774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordanian phone number in local formate, 077XXXXXXX", () => {
      const input = "0777774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate +962 79XXXXXXX", () => {
      const input = "+962797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate +962 079XXXXXXX", () => {
      const input = "+962 0797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate +962 78XXXXXXX", () => {
      const input = "+962787774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate +962 77XXXXXXX", () => {
      const input = "+962777774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0079XXXXXXX", () => {
      const input = "00797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0078XXXXXXX", () => {
      const input = "00787774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0077XXXXXXX", () => {
      const input = "00777774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  +96279XXXXXXX", () => {
      const input = "+962797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  +96277XXXXXXX", () => {
      const input = "+962777774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  +96278XXXXXXX", () => {
      const input = "+962787774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  +962079XXXXXXX", () => {
      const input = "+9620797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  +962077XXXXXXX", () => {
      const input = "+9620777774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  +962078XXXXXXX", () => {
      const input = "+9620787774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0079XXXXXXX", () => {
      const input = "00797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0077XXXXXXX", () => {
      const input = "00777774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0078XXXXXXX", () => {
      const input = "00787774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0079 XXXXXXX", () => {
      const input = "0079 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0078 XXXXXXX", () => {
      const input = "0078 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  0077 XXXXXXX", () => {
      const input = "0077 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  079 XXXXXXX", () => {
      const input = "0797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  078 XXXXXXX", () => {
      const input = "078 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  077 XXXXXXX", () => {
      const input = "077 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  79XXXXXX", () => {
      const input = "797774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  78XXXXXXX", () => {
      const input = "787774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  77XXXXXXX", () => {
      const input = "777774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  079 XXXXXXX", () => {
      const input = "079 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  078 XXXXXXX", () => {
      const input = "078 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });

    test("should create valid jordan phone number in local formate  077 XXXXXXX", () => {
      const input = "077 7774077";
      const phoneNumber = new userPhoneNumber(input);
      expect(phoneNumber.getValue()).toBe(input);
    });
  });

  describe("Invalidate create object", () => {
    test("should throw error for empty phone number", () => {
      const input = "";
      expect(() => new userPhoneNumber(input)).toThrow(
        "Phone number is required"
      );
    });

    test("should throw error for phone number with invalid country code", () => {
      const input = "00667774077"; // Invalid country code
      expect(() => new userPhoneNumber(input)).toThrow(
        "Invalid phone number. Use international format (+[country code][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX)."
      );
    });

    test("should throw error for phone number with invalid string ", () => {
      const input = "00ab667774077"; // Invalid country code
      expect(() => new userPhoneNumber(input)).toThrow(
        "Invalid phone number. Use international format (+[country code][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX)."
      );
    });

    test("should throw error for phone number with invalid string ", () => {
      const input = "0797774077f"; // Invalid country code
      expect(() => new userPhoneNumber(input)).toThrow(
        "Invalid phone number. Use international format (+[country code][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX)."
      );
    });

    test("should throw error for phone number with invalid phone ", () => {
      const input = "1234567890"; // Invalid country code
      expect(() => new userPhoneNumber(input)).toThrow(
        "Invalid phone number. Use international format (+[country code][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX)."
      );
    });
  });
});
