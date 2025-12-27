import { StudentUniversity } from "../../../../src/Domain/Value-Object/StudentUniversity.vo";

describe("StudentUniversity Value Object", () => {
  
  // =========================================================
  //  White List (Valid Scenarios)
  // =========================================================
  describe("White List (Success)", () => {

    test("should accept an exact name from the list", () => {
      const input = "University of Jordan";
      const university = StudentUniversity.create(input);
      
      expect(university.getValue()).toBe("University of Jordan");
    });

    test("should be case-insensitive (e.g., 'petra university')", () => {
      const input = "petra university"; 
      const university = StudentUniversity.create(input);
      
      // Should return the official capitalized name from the list
      expect(university.getValue()).toBe("Petra University");
    });

    test("should handle names with special characters (e.g., W.I.S.E)", () => {
      // Input from your list
      const input = "The World Islamic Science & Education University (W.I.S.E)";
      const university = StudentUniversity.create(input);
      
      expect(university.getValue()).toBe(input);
    });

    test("should automatically trim whitespace", () => {
      const input = "   Yarmouk University   ";
      const university = StudentUniversity.create(input);
      
      expect(university.getValue()).toBe("Yarmouk University");
    });
  });

  // =========================================================
  //  Black List (Invalid Scenarios)
  // =========================================================
  describe("Black List (Failure)", () => {

    test("should throw error if input is empty", () => {
      expect(() => {
        StudentUniversity.create("");
      }).toThrow("University Name is required");
    });

    test("should throw error if input is just whitespace", () => {
      expect(() => {
        StudentUniversity.create("   ");
      }).toThrow("University Name is required");
    });

    test("should throw error if university is NOT in the list", () => {
      const fakeUni = "Harvard University";
      expect(() => {
        StudentUniversity.create(fakeUni);
      }).toThrow(`Invalid University: "${fakeUni}" is not in our approved list.`);
    });

    test("should throw error for partial matches", () => {
      // "Jordan" is part of the name, but not the full name
      expect(() => {
        StudentUniversity.create("Jordan");
      }).toThrow('Invalid University: "Jordan" is not in our approved list.');
    });

    // Since you removed the object structure, short names like "JU" 
    // will now fail unless "JU" is explicitly added to your string array.
    test("should throw error for short names (if not in list)", () => {
      expect(() => {
        StudentUniversity.create("JU");
      }).toThrow('Invalid University: "JU" is not in our approved list.');
    });
  });

});