import { AuditLogActionType } from "../../../../src/Domain/Shared/Enum/AuditLogAction.enum";

describe("AuditLogActionType Enum", () => {
  test("should have 'POST' action", () => {
    expect(AuditLogActionType.POST).toBe("POST");
  });

  test("should have 'GET' action", () => {
    expect(AuditLogActionType.GET).toBe("GET");
  });

  test("should have 'DELETE' action", () => {
    expect(AuditLogActionType.DELETe).toBe("DELETE");
  });

  test("should have 'PUT' action", () => {
    expect(AuditLogActionType.PUT).toBe("PUT");
  });

  test("should have 'PATCH' action", () => {
    expect(AuditLogActionType.PATCH).toBe("PATCH");
  });

  test("should have correct action values", () => {
    expect(AuditLogActionType.POST).toEqual("POST");
    expect(AuditLogActionType.GET).toEqual("GET");
    expect(AuditLogActionType.PATCH).toEqual("PATCH");
    expect(AuditLogActionType.POST).toEqual("PUT");
    expect(AuditLogActionType.DELETe).toEqual("DELETE");
  });

  test("should return all possible actions", () => {
    const actions = Object.values(AuditLogActionType);
    expect(actions).toEqual(["POST", "GET", "PUT", "PATCH,DELETE"]);
  });
});
