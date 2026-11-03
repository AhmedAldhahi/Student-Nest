import { UserAccountStatus } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Enum/UserAccountStatus.enum";

describe("UserAccountStatus Enum", () => {
  test("should have 'activate' status", () => {
    expect(UserAccountStatus.activate).toBe("activate");
  });

  test("should have 'deactivate' status", () => {
    expect(UserAccountStatus.deactivate).toBe("deactivate");
  });

  test("should have 'banded' status", () => {
    expect(UserAccountStatus.banded).toBe("banded");
  });

  test("should have correct status values", () => {
    expect(UserAccountStatus.activate).toEqual("activate");
    expect(UserAccountStatus.deactivate).toEqual("deactivate");
    expect(UserAccountStatus.banded).toEqual("banded");
  });

  test("should return all possible account statuses", () => {
    const statuses = Object.values(UserAccountStatus);
    expect(statuses).toEqual(["activate", "deactivate", "banded"]);
  });
});
