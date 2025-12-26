import { LeaseStatus } from "../../../../src/Domain/Enum/LeaseStatus.enum";

describe(" Lease Status Enum", () => {
  test("should have 'Active' action", () => {
    expect(LeaseStatus.Active).toBe("Active");
  });

  test("should have 'Deactivate' action", () => {
    expect(LeaseStatus.Deactivate).toBe("Deactivate");
  });

  test("should have correct action values", () => {
    expect(LeaseStatus.Active).toEqual("Active");
    expect(LeaseStatus.Deactivate).toEqual("Deactivate");
  });

  test("should return all possible actions", () => {
    const actions = Object.values(LeaseStatus);
    expect(actions).toEqual(["Active", "Deactivate"]);
  });
});
