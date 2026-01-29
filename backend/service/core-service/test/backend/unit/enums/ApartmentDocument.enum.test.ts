import { ApartmentDocumentType } from "../../../../src/Domain/BoundedContexts/Housing/Enum/ApartmentDocument.enum";

describe(" Lease Status Enum", () => {
  test("should have 'ApartmentVerifiedFile' action", () => {
    expect(ApartmentDocumentType.ApartmentVerifiedFile).toBe(
      "ApartmentVerifiedFile"
    );
  });

  test("should have 'LeaseFile' action", () => {
    expect(ApartmentDocumentType.LeaseFile).toBe("LeaseFile");
  });

  test("should have correct action values", () => {
    expect(ApartmentDocumentType.ApartmentVerifiedFile).toEqual(
      "ApartmentVerifiedFile"
    );
    expect(ApartmentDocumentType.LeaseFile).toEqual("LeaseFile");
  });

  test("should return all possible actions", () => {
    const actions = Object.values(ApartmentDocumentType);
    expect(actions).toEqual(["ApartmentVerifiedFile", "LeaseFile"]);
  });
});
