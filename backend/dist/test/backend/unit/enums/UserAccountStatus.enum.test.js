"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserAccountStatus_enum_1 = require("../../../../src/Core/enum/UserAccountStatus.enum");
describe("UserAccountStatus Enum", () => {
    test("should have 'activate' status", () => {
        expect(UserAccountStatus_enum_1.UserAccountStatus.activate).toBe("activate");
    });
    test("should have 'deactivate' status", () => {
        expect(UserAccountStatus_enum_1.UserAccountStatus.deactivate).toBe("deactivate");
    });
    test("should have 'banded' status", () => {
        expect(UserAccountStatus_enum_1.UserAccountStatus.banded).toBe("banded");
    });
    test("should have correct status values", () => {
        expect(UserAccountStatus_enum_1.UserAccountStatus.activate).toEqual("activate");
        expect(UserAccountStatus_enum_1.UserAccountStatus.deactivate).toEqual("deactivate");
        expect(UserAccountStatus_enum_1.UserAccountStatus.banded).toEqual("banded");
    });
    test("should return all possible account statuses", () => {
        const statuses = Object.values(UserAccountStatus_enum_1.UserAccountStatus);
        expect(statuses).toEqual(["activate", "deactivate", "banded"]);
    });
});
