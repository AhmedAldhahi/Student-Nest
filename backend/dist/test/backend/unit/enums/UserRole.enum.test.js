"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRole_enum_1 = require("../../../../src/Core/enum/UserRole.enum");
describe("UserRole Enum", () => {
    test("should have 'admin' role", () => {
        expect(UserRole_enum_1.UserRole.admin).toBe("admin");
    });
    test("should have 'landloard' role", () => {
        expect(UserRole_enum_1.UserRole.landloard).toBe("landloard");
    });
    test("should have 'student' role", () => {
        expect(UserRole_enum_1.UserRole.student).toBe("student");
    });
    test("should have correct role values", () => {
        expect(UserRole_enum_1.UserRole.admin).toEqual("admin");
        expect(UserRole_enum_1.UserRole.landloard).toEqual("landloard");
        expect(UserRole_enum_1.UserRole.student).toEqual("student");
    });
    test("should return all possible roles", () => {
        const roles = Object.values(UserRole_enum_1.UserRole);
        expect(roles).toEqual(["admin", "landloard", "student"]);
    });
});
