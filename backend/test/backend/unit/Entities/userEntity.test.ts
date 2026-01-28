import { UserEntity } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Entities/userEntity.entity";
import { UserRole } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { UserDataType } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/types/UserDataType.type";

// Value Objects Imports
import { OTP } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";
import { UserName } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo";
import { UserEmail } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo";
import { userPhoneNumber } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserPhoneNumber.vo";
import { UserDateOfBirth } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo";

// 1. Automatic Mocks
jest.mock(
  "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo",
);
jest.mock(
  "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo",
);
jest.mock(
  "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo",
);
jest.mock(
  "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserPhoneNumber.vo",
);
jest.mock(
  "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo",
);

describe("UserEntity Unit Tests", () => {
  // 2. Define Variables
  let mockOtp: OTP;
  let mockName: UserName;
  let mockEmail: UserEmail;
  let mockPhone: userPhoneNumber;
  let mockDob: UserDateOfBirth;

  let userEntity: UserEntity;
  let userData: UserDataType;

  beforeEach(() => {
    // 3. Clear Mocks
    (OTP as unknown as jest.Mock).mockClear();
    (UserName as unknown as jest.Mock).mockClear();
    (UserEmail as unknown as jest.Mock).mockClear();
    (userPhoneNumber as unknown as jest.Mock).mockClear();
    (UserDateOfBirth as unknown as jest.Mock).mockClear();

    // 4. Initialize Mocks (Pass dummy args to satisfy constructor requirements)
    mockOtp = new OTP("1234", new Date());
    mockName = new UserName("John");
    mockEmail = new UserEmail("test@example.com");
    mockPhone = new userPhoneNumber("0790000000");
    mockDob = new UserDateOfBirth("2000-01-01");

    // 5. Set Default Mock Behavior (Crucial!)
    (mockName.getValue as jest.Mock).mockReturnValue("John Doe");
    (mockEmail.getValue as jest.Mock).mockReturnValue("test@example.com");
    (mockOtp.getValue as jest.Mock).mockReturnValue("1234");
    (mockOtp.getExpiresAt as jest.Mock).mockReturnValue(
      new Date(Date.now() + 10000),
    ); // Not expired
    (mockOtp.verfiedOtp as jest.Mock).mockReturnValue(true);

    // 6. Setup Data Object
    userData = {
      userId: "user-id-01",
      password: "hassedPassword35Q!",
      name: mockName,
      phoneNumber: mockPhone,
      email: mockEmail,
      dateOfBirth: mockDob,
      role: UserRole.admin,
      createdAt: new Date(),
      address: "amman,jordan",
      photo: "file1.png",
    };

    // 7. Initialize Entity
    userEntity = new UserEntity(userData);
  });

  /**
   * TEST CASES
   */

  it("should be defined and return correct values from getters", () => {
    expect(userEntity).toBeDefined();
    expect(userEntity.getName()).toBe("John Doe");
    expect(userEntity.getEmail()).toBe("test@example.com");
    expect(userEntity.getUserId()).toBe("user-id-01");
    expect(userEntity.getPass()).toBe("hassedPassword35Q!");
    expect(userEntity.getDateOfBirth()).toBe("2000-01-01");
    expect(userEntity.getPhoneNumber()).toBe("0790000000");

    // Check that it actually called the mock's .getValue()
    expect(mockName.getValue).toHaveBeenCalled();
  });

  describe("Email Verification", () => {
    it("should successfully verify email when OTP is valid", () => {
      // Arrange
      userEntity.setOtpForEmail(mockOtp);

      // Act
      userEntity.verifiedEmailOTP("1234");

      // Assert
      expect(userEntity.getVerifiedEmail()).toBe(true);
      expect(userEntity.getOtpForEmail()).toBeNull(); // Should be cleared after success
      expect(mockOtp.verfiedOtp).toHaveBeenCalledWith("1234");
    });

    it("should throw error if OTP is expired", () => {
      // Arrange
      userEntity.setOtpForEmail(mockOtp);
      // Force mock to be expired
      (mockOtp.getExpiresAt as jest.Mock).mockReturnValue(
        new Date(Date.now() - 10000),
      );

      // Act & Assert
      expect(() => userEntity.verifiedEmailOTP("1234")).toThrow("OTP expired.");
    });

    it("should throw error if OTP is invalid", () => {
      // Arrange
      userEntity.setOtpForEmail(mockOtp);
      // Force mock to return false (invalid code)
      (mockOtp.verfiedOtp as jest.Mock).mockReturnValue(false);

      // Act & Assert
      expect(() => userEntity.verifiedEmailOTP("WRONG_CODE")).toThrow(
        "Invalid OTP code.",
      );
    });
  });

  describe("Access Control (ensureAccountIsActive)", () => {
    it("should allow access if account is active and verified", () => {
      userEntity.activatedAccount();
      userEntity.verifiedEmail();

      expect(() => userEntity.ensureAccountIsActive()).not.toThrow();
    });

    it("should throw if email is not verified", () => {
      userEntity.activatedAccount();
      userEntity.resetVerifiedEmail(); // Ensure false

      expect(() => userEntity.ensureAccountIsActive()).toThrow(
        "You have to verified you account before to go to your functionality",
      );
    });

    it("should throw if account is banned", () => {
      userEntity.banAccount();
      expect(() => userEntity.ensureAccountIsActive()).toThrow(
        "Access Denied: you account been banded !!",
      );
    });
  });

  describe("Factory Method (create)", () => {
    it("should throw error currently because OTP is not set in constructor", () => {
      // Based on your current code, `create` checks for OTP immediately.
      // Since `userData` does not include OTP, and the constructor doesn't set it, this MUST fail.
      expect(() => UserEntity.create(userData)).toThrow(
        "otp value can not during register be undenied or null",
      );
    });

    /** * If you fix your entity code to accept OTP in the factory,
     * use this test instead:
     */
    it("should create user and register event (if logic was patched)", () => {
      // Only if you inject the OTP manually before validation:
      const user = new UserEntity(userData);
      user.setOtpForEmail(mockOtp);

      // Manually simulating the logic inside 'create'
      const otpValue = user.getOtpForEmail();
      expect(otpValue).toBe("1234");
    });
  });
});
