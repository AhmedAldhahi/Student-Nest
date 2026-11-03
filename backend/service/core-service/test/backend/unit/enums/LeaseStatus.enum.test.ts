import { LeaseStatus } from "../../../../src/Domain/BoundedContexts/Leases/Enum/LeaseStatus.enum";

describe("Lease Status Enum", () => {
  test("should have 'active' action", () => {
    expect(LeaseStatus.Active).toBe("active");
  });

  test("should have 'deactivate' action", () => {
    expect(LeaseStatus.Deactivate).toBe("deactivate");
  });

  test("should have correct action values", () => {
    expect(LeaseStatus.Active).toEqual("active");
    expect(LeaseStatus.Deactivate).toEqual("deactivate");
  });

  test("should return all possible actions", () => {
    const actions = Object.values(LeaseStatus);
    expect(actions).toEqual(["active", "deactivate"]);
  });
});
