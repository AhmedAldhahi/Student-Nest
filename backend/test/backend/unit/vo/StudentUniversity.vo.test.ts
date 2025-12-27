import { StudentUniversity } from "../../../../src/Domain/Value-Object/StudentUniversity.vo";

describe("StudentUniversity Value Object", () => {
  
  // =========================================================
  // ✅ White List (Valid Scenarios)
  // =========================================================
  describe("White List (Success)", () => {

    test("should accept an exact Full Name (e.g., 'University of Jordan')", () => {
      const input = "University of Jordan";
      const university = StudentUniversity.create(input);
      
      expect(university).toBeInstanceOf(StudentUniversity);
      expect(university.getValue()).toBe(input);
    });

    test("should accept a Short Name and convert it to Full Name (e.g., 'JU' -> 'University of Jordan')", () => {
      const input = "JU";
      const university = StudentUniversity.create(input);
      
      // Verification: The Value Object should store the OFFICIAL name, not the abbreviation
      expect(university.getValue()).toBe("University of Jordan");
    });

    test("should be case-insensitive (e.g., 'german-jordanian university')", () => {
      const input = "german-jordanian university"; // Lowercase input
      const university = StudentUniversity.create(input);
      
      // Should match "German-Jordanian University"
      expect(university.getValue()).toBe("German-Jordanian University");
    });

    test("should handle names with special characters (e.g., W.I.S.E)", () => {
      const input = "The World Islamic Science & Education University (W.I.S.E)";
      const university = StudentUniversity.create(input);
      
      expect(university.getValue()).toBe(input);
    });

    test("should trim whitespace from input", () => {
      const input = "   Yarmouk University   ";
      const university = StudentUniversity.create(input);
      
      expect(university.getValue()).toBe("Yarmouk University");
    });
  });

  // =========================================================
  // ❌ Black List (Invalid Scenarios)
  // =========================================================
  describe("Black List (Failure)", () => {

    test("should throw error if input is empty", () => {
      expect(() => {
        StudentUniversity.create("");
      }).toThrow("University Name is required");
    });

    test("should throw error if input is whitespace", () => {
      expect(() => {
        StudentUniversity.create("   ");
      }).toThrow("University Name is required");
    });

    test("should throw error if university does not exist in the list", () => {
      const fakeUniversity = "Hogwarts School of Witchcraft";
      expect(() => {
        StudentUniversity.create(fakeUniversity);
      }).toThrow(`Invalid University: "${fakeUniversity}" is not in our approved list.`);
    });

    test("should throw error for partial matches that are not exact", () => {
      // "Jordan" exists in "University of Jordan", but "Jordan" alone is not a valid university name
      expect(() => {
        StudentUniversity.create("Jordan");
      }).toThrow('Invalid University: "Jordan" is not in our approved list.');
    });
  });

});