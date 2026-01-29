import { LeaseRequestStatus } from "../../../../src/Domain/BoundedContexts/Leases/Enum/LeaseRequestStatus.enum";

describe(" LeaseRequest  Status Enum", () => {
  test("should have 'Pending' action", () => {
    expect(LeaseRequestStatus.Pending).toBe("Pending");
  });

  test("should have 'Accept' action", () => {
    expect(LeaseRequestStatus.Accept).toBe("Accept");
  });

  test("should have 'Reject' action", () => {
    expect(LeaseRequestStatus.Reject).toBe("Reject");
  });

  test("should have correct action values", () => {
    expect(LeaseRequestStatus.Pending).toEqual("Pending");
    expect(LeaseRequestStatus.Accept).toEqual("Accept");
    expect(LeaseRequestStatus.Reject).toEqual("Reject");
  });

  test("should return all possible actions", () => {
    const actions = Object.values(LeaseRequestStatus);
    expect(actions).toEqual(["Pending", "Accept", "Reject"]);
  });
});
