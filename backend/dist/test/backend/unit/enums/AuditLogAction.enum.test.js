"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuditLogAction_enum_1 = require("../../../../src/Core/enum/AuditLogAction.enum");
describe("AuditLogActionType Enum", () => {
    test("should have 'CREATE' action", () => {
        expect(AuditLogAction_enum_1.AuditLogActionType.CREATE).toBe("create");
    });
    test("should have 'UPDATE' action", () => {
        expect(AuditLogAction_enum_1.AuditLogActionType.UPDATE).toBe("update");
    });
    test("should have 'DELETE' action", () => {
        expect(AuditLogAction_enum_1.AuditLogActionType.DELETE).toBe("delete");
    });
    test("should have correct action values", () => {
        expect(AuditLogAction_enum_1.AuditLogActionType.CREATE).toEqual("create");
        expect(AuditLogAction_enum_1.AuditLogActionType.UPDATE).toEqual("update");
        expect(AuditLogAction_enum_1.AuditLogActionType.DELETE).toEqual("delete");
    });
    test("should return all possible actions", () => {
        const actions = Object.values(AuditLogAction_enum_1.AuditLogActionType);
        expect(actions).toEqual(["create", "update", "delete"]);
    });
});
