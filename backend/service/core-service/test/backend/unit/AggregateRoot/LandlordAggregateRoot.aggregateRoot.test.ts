import { LandlordAggregateRoot } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Aggregates/landloardAggregateRoot.entity";
import { LandlordDataType } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/types/ILandlordData.type";
import { GovernmentID } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";

// mock value object
const mockGovId = { getValue: () => "2000555104" } as unknown as GovernmentID;
const mockVerificationDocument = {
  getValue: () => "verification.png",
} as unknown as VerificationDocument;

const baseLandlordMock: LandlordDataType = {
  userId: "landlord-123",
  landlordGovId: mockGovId,
  document: mockVerificationDocument,
  cliQAccount: "ahmed-cliQ",
  isVerifiedLandlord: true,
};

describe("landlord aggregate root ,", () => {
  let landlord: LandlordAggregateRoot;

  beforeEach(() => {
    landlord = new LandlordAggregateRoot(baseLandlordMock);
  });

  describe("Initialization", () => {
    test("should create valid landlord data", () => {
      expect(landlord.getUserId()).toBe("landlord-123");
      expect(landlord.getCliQAccount()).toBe("ahmed-cliQ");
      expect(landlord.getGovId()).toBe("2000555104");
      expect(landlord.getLandlordVerified()).toBe(true);
      expect(landlord.getVerificationFile()).toBe("verification.png");
    });
  });

  
});
