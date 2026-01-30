import { LandlordAggregateRoot } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Aggregates/landloardAggregateRoot.entity";
import { LandlordRegisterEvent } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Events/LandlordRegisterdEvent.event";
import { LandlordDataType } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/types/ILandlordData.type";
import { GovernmentID } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";

// Mocking Value Objects to focus strictly on Aggregate Logic
const mockGovIdValue = "123456789";
const mockDocValue = "path/to/doc.pdf";

const mockGovId = {
  getValue: jest.fn().mockReturnValue(mockGovIdValue)
} as unknown as GovernmentID;

const mockDocument = {
  getValue: jest.fn().mockReturnValue(mockDocValue)
} as unknown as VerificationDocument;

const baseData: LandlordDataType = {
  userId: "user-123",
  landlordGovId: mockGovId,
  cliQAccount: "cliQ-user",
  document: mockDocument,
  isVerifiedLandlord: false
};

describe('LandlordAggregateRoot', () => {

  describe('Factory Method (create)', () => {
    it('should create a valid instance with correct properties', () => {
      const landlord = LandlordAggregateRoot.create(baseData);

      expect(landlord).toBeInstanceOf(LandlordAggregateRoot);
      expect(landlord.getUserId()).toBe(baseData.userId);
      expect(landlord.getCliQAccount()).toBe(baseData.cliQAccount);
      expect(landlord.getGovId()).toBe(mockGovIdValue);
      expect(landlord.getVerificationFile()).toBe(mockDocValue);
    });

    it('should force isVerifiedLandlord to false upon creation', () => {
      // Even if we pass true in data
      const dataWithTrue = { ...baseData, isVerifiedLandlord: true }; 
      const landlord = LandlordAggregateRoot.create(dataWithTrue);

      expect(landlord.getLandlordVerified()).toBe(false);
    });

    it('should add a LandlordRegisterEvent domain event', () => {
      const landlord = LandlordAggregateRoot.create(baseData);

      // Assuming AggregateRoot has a getDomainEvents method or similar exposed property
      // If your base class uses a protected property, you might need to inspect via 'any' or a public getter
      const events = (landlord as any).domainEvents || (landlord as any)._domainEvents; 
      
      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(0);
      expect(events[0]).toBeInstanceOf(LandlordRegisterEvent);
      expect(events[0].userId).toBe(baseData.userId);
    });
  });

  describe('Constructor', () => {
    it('should reconstitute an existing landlord (e.g. from DB) preserving verified status', () => {
      const existingData = { ...baseData, isVerifiedLandlord: true };
      const landlord = new LandlordAggregateRoot(existingData);

      expect(landlord.getLandlordVerified()).toBe(true);
    });
  });

  describe('Behavior: Verification Status', () => {
    it('should throw error when calling ensureIsLandlordVerified if not verified', () => {
      const landlord = new LandlordAggregateRoot({ ...baseData, isVerifiedLandlord: false });

      expect(() => {
        landlord.ensureIsLandlordVerified();
      }).toThrow("you have to be verified to apply your functionality ");
    });

    it('should NOT throw error when calling ensureIsLandlordVerified if verified', () => {
      const landlord = new LandlordAggregateRoot({ ...baseData, isVerifiedLandlord: true });

      expect(() => {
        landlord.ensureIsLandlordVerified();
      }).not.toThrow();
    });

    it('should mark landlord as verified', () => {
      const landlord = new LandlordAggregateRoot({ ...baseData, isVerifiedLandlord: false });
      landlord.markLandlordAsVerified();
      expect(landlord.getLandlordVerified()).toBe(true);
    });

    it('should reset landlord verification', () => {
      const landlord = new LandlordAggregateRoot({ ...baseData, isVerifiedLandlord: true });
      landlord.resetLandlordVerified();
      expect(landlord.getLandlordVerified()).toBe(false);
    });
  });

  describe('Behavior: Update Verification File', () => {
    it('should update the document and reset verification status to false', () => {
      // Arrange: Landlord is currently verified
      const landlord = new LandlordAggregateRoot({ ...baseData, isVerifiedLandlord: true });
      
      const newDocValue = "new/path.png";
      const newDocument = {
        getValue: jest.fn().mockReturnValue(newDocValue)
      } as unknown as VerificationDocument;

      // Act
      landlord.updateVerificationFile(newDocument);

      // Assert
      expect(landlord.getVerificationFile()).toBe(newDocValue);
      // Crucial Business Rule: changing the doc must require re-verification
      expect(landlord.getLandlordVerified()).toBe(false); 
    });
  });

  describe('Behavior: Update CliQ Account', () => {
    it('should update CliQ account given valid input', () => {
      const landlord = new LandlordAggregateRoot(baseData);
      const newAccount = "ValidAccount";
      
      landlord.updateCliQAccount(newAccount);

      expect(landlord.getCliQAccount()).toBe(newAccount);
    });

    it('should throw error if CliQ account is too short', () => {
      const landlord = new LandlordAggregateRoot(baseData);
      const invalidAccount = "ab"; // Less than 3 chars

      expect(() => {
        landlord.updateCliQAccount(invalidAccount);
      }).toThrow("invalid CliQ Account !!");
    });
  });
});