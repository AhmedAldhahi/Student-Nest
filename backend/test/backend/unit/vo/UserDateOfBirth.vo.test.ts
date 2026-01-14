// Import the constant to ensure tests stay in sync with your logic
import { UserDateOfBirth } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo";
import { currentYear } from "../../../../src/Shared/constants/validationZod.constant"; 

describe("UserDateOfBirth Value Object", () => {

  // =========================================================
  // Success Scenarios (White List)
  // =========================================================
  describe("Validation Success (White List)", () => {
    
    test("should successfully create a DOB for an 18-year-old (Min Allowed Age)", () => {
      const validYear = (currentYear - 18).toString(); // e.g., 2007
      const dob = UserDateOfBirth.create(validYear);
      
      expect(dob).toBeInstanceOf(UserDateOfBirth);
      expect(dob.getValue()).toBe(validYear);
    });

    test("should successfully create a DOB for a 70-year-old (Max Allowed Age)", () => {
      const validYear = (currentYear - 70).toString(); 
      const dob = UserDateOfBirth.create(validYear);

      expect(dob.getValue()).toBe(validYear);
    });

    test("should successfully create a DOB for a standard user (e.g. 25 years old)", () => {
      const validYear = (currentYear - 25).toString();
      const dob = UserDateOfBirth.create(validYear);

      expect(dob.getValue()).toBe(validYear);
    });
  });

  // =========================================================
  // ❌ Failure Scenarios (Black List)
  // =========================================================
  describe("Validation Failure (Black List)", () => {

    test("should throw error if input is empty", () => {
      expect(() => {
        UserDateOfBirth.create("");
      }).toThrow("Date of birth is required");
    });

    test("should throw error if input is not 4 digits (e.g., '079')", () => {
      const invalidInput = "079";
      expect(() => {
        UserDateOfBirth.create(invalidInput);
      }).toThrow("Invalid date of birth format");
    });

    test("should throw error if input contains letters (e.g., 'abcd')", () => {
      expect(() => {
        UserDateOfBirth.create("abcd");
      }).toThrow("Invalid date of birth format");
    });

    test("should throw error if user is too young (< 18)", () => {
      const youngYear = (currentYear - 17).toString(); // 17 years old
      expect(() => {
        UserDateOfBirth.create(youngYear);
      }).toThrow("The User must be at least 18 years old!");
    });

    test("should throw error if user is too old (> 70)", () => {
      const oldYear = (currentYear - 80).toString(); // 80 years old
      expect(() => {
        UserDateOfBirth.create(oldYear);
      }).toThrow("The User must be under 70 years old!");
    });

    test("should throw error if input is a future year", () => {
      const futureYear = (currentYear + 1).toString();
      expect(() => {
        UserDateOfBirth.create(futureYear);
      }).toThrow("The User must be at least 18 years old!"); 
      // Logic: Age would be -1, which is < 18
    });
  });
});