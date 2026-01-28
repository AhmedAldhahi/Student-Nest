import { VerifiedLandlordStatus } from "../../../../src/Domain/BoundedContexts/Payment/Enum/VerfiedLandlordStatus.enum";

describe("Verified Landlord status Enum", () => {
  test("should have 'Accept' status", () => {
    expect(VerifiedLandlordStatus.Accept).toBe("Accept");
  });

  test("should have 'Reject' status", () => {
    expect(VerifiedLandlordStatus.Reject).toBe("Reject");
  });

  test("should have 'Pending' status", () => {
    expect(VerifiedLandlordStatus.Pending).toBe("Pending");
  });

  // for get all enum value
  test("should return all possible Verified Landlord status", () => {
    const statuses = Object.values(VerifiedLandlordStatus);
    expect(statuses).toEqual(["Pending", "Accept", "Reject"]);
  });
});
