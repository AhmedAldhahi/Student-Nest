import { UserRole } from "../../../../src/Domain/Enum/UserRole.enum";

describe("UserRole Enum", () => {
  test("should have 'admin' role", () => {
    expect(UserRole.admin).toBe("admin");
  });

  test("should have 'landloard' role", () => {
    expect(UserRole.landloard).toBe("landloard");
  });

  test("should have 'student' role", () => {
    expect(UserRole.student).toBe("student");
  });

  test("should have correct role values", () => {
    expect(UserRole.admin).toEqual("admin");
    expect(UserRole.landloard).toEqual("landloard");
    expect(UserRole.student).toEqual("student");
  });

  test("should return all possible roles", () => {
    const roles = Object.values(UserRole);
    expect(roles).toEqual(["admin", "landloard", "student"]);
  });
});
