import { UserRole } from "../../../../src/Domain/Shared/Enum/UserRole.enum";

describe("UserRole Enum", () => {
  test("should have 'admin' role", () => {
    expect(UserRole.admin).toBe("admin");
  });

  test("should have 'landlord' role", () => {
    expect(UserRole.landlord).toBe("landlord");
  });

  test("should have 'student' role", () => {
    expect(UserRole.student).toBe("student");
  });

  test("should have correct role values", () => {
    expect(UserRole.admin).toEqual("admin");
    expect(UserRole.landlord).toEqual("landlord");
    expect(UserRole.student).toEqual("student");
  });

  test("should return all possible roles", () => {
    const roles = Object.values(UserRole);
    expect(roles).toEqual(["admin", "landlord", "student", "Guest"]);
  });
});
