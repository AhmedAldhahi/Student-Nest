import { AuditLogActionType } from "../../../../src/Domain/Enum/AuditLogAction.enum";

describe("AuditLogActionType Enum", () => {
  test("should have 'CREATE' action", () => {
    expect(AuditLogActionType.CREATE).toBe("create");
  });

  test("should have 'UPDATE' action", () => {
    expect(AuditLogActionType.UPDATE).toBe("update");
  });

  test("should have 'DELETE' action", () => {
    expect(AuditLogActionType.DELETE).toBe("delete");
  });

  test("should have correct action values", () => {
    expect(AuditLogActionType.CREATE).toEqual("create");
    expect(AuditLogActionType.UPDATE).toEqual("update");
    expect(AuditLogActionType.DELETE).toEqual("delete");
  });

  test("should return all possible actions", () => {
    const actions = Object.values(AuditLogActionType);
    expect(actions).toEqual(["create", "update", "delete"]);
  });
});
