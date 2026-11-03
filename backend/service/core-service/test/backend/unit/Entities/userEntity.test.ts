import { UserEntity } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Entities/userEntity.entity";
import { UserAccountStatus } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Enum/UserAccountStatus.enum";
import { UserRole } from "../../../../src/Domain/Shared/Enum/UserRole.enum";
import { UserDataType } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/types/UserDataType.type";
import { OTP } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";
import { UserDateOfBirth } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo";
import { UserName } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserPhoneNumber.vo";

// We mock the Value Objects to focus strictly on the UserEntity logic
const mockUserName = { getValue: () => "John Doe" } as unknown as UserName;
const mockUserEmail = {
  getValue: () => "john@example.com",
} as unknown as UserEmail;
const mockUserDOB = {
  getValue: () => "1990-01-01",
} as unknown as UserDateOfBirth;
const mockUserPhone = {
  getValue: () => "1234567890",
} as unknown as userPhoneNumber;

const createMockOTP = (
  value: string,
  isExpired: boolean = false,
  isValid: boolean = true,
) => {
  return {
    getValue: jest.fn().mockReturnValue(value),
    getExpiresAt: jest
      .fn()
      .mockReturnValue(
        isExpired ? new Date(Date.now() - 10000) : new Date(Date.now() + 10000),
      ),
    verfiedOtp: jest.fn().mockReturnValue(isValid),
  } as unknown as OTP;
};

const baseUserData: UserDataType = {
  userId: "user-123",
  password: "hashed-password",
  name: mockUserName,
  dateOfBirth: mockUserDOB,
  phoneNumber: mockUserPhone,
  email: mockUserEmail,
  role: UserRole.student, 
  createdAt: new Date(),
  address: "123 Main St",
  photo: "photo-url",
};

describe("UserEntity", () => {
  let user: UserEntity;

  beforeEach(() => {
    // Reset user instance before each test
    user = new UserEntity(baseUserData);
    // Clear domain events from the base class if necessary
    // user.clearEvents();
  });

  // ==========================================================
  // 1. Initialization & Factory
  // ==========================================================
  describe("Creation", () => {
    it("should create a valid UserEntity instance", () => {
      expect(user).toBeInstanceOf(UserEntity);
      expect(user.getUserId()).toBe("user-123");
      expect(user.getRole()).toBe(UserRole.student);
      expect(user.getAccountStatus()).toBe(UserAccountStatus.activate);
      expect(user.getVerifiedEmail()).toBe(false); // Default
    });

    /**
     * NOTE: The static `create` method in your code checks for an OTP immediately
     * (`user.getOtpForEmail()`). However, the constructor provided does not assign
     * the OTP from `data`.
     * * If you fix the constructor to assign `this.emailOTP = data.otp`,
     * you can uncomment and use this test:
     */
    /*
    it('should create via factory method and raise UserRegisteredEvent', () => {
        // Setup mock to return OTP so validation passes
        const mockOTP = createMockOTP('1234');
        const dataWithOTP = { ...baseUserData, emailOTP: mockOTP }; // Assuming type allows this
        
        // You might need to temporarily patch logic or fix constructor for this to pass
        // const newUser = UserEntity.create(dataWithOTP);
        
        // expect(newUser.getDomainEvents()[0]).toBeInstanceOf(UserRegisteredEvent);
    });
    */
  });

  // ==========================================================
  // 2. Email Verification Logic
  // ==========================================================
  describe("Email Verification", () => {
    it("should verify email successfully with valid OTP", () => {
      const otp = createMockOTP("123456", false, true);
      user.setOtpForEmail(otp);

      user.verifiedEmailOTP("123456");

      expect(user.getVerifiedEmail()).toBe(true);
      expect(user.getOtpForEmail()).toBeUndefined(); // Should be cleared
    });

    it("should throw error if OTP is not set", () => {
      expect(() => user.verifiedEmailOTP("123456")).toThrow(
        "No OTP set for email verification.",
      );
    });

    it("should throw error if Email is already verified", () => {
      // Force verified state
      user.verifiedEmail();
      expect(() => user.verifiedEmailOTP("123456")).toThrow(
        "Email already verified.",
      );
    });

    it("should throw error if OTP is expired", () => {
      const expiredOTP = createMockOTP("123456", true, true);
      user.setOtpForEmail(expiredOTP);

      expect(() => user.verifiedEmailOTP("123456")).toThrow("OTP expired.");
    });

    it("should throw error if OTP code is invalid", () => {
      // Mock verfiedOtp to return false
      const invalidOTP = createMockOTP("123456", false, false);
      user.setOtpForEmail(invalidOTP);

      expect(() => user.verifiedEmailOTP("000000")).toThrow(
        "Invalid OTP code.",
      );
    });
  });

  // ==========================================================
  // 3. Password Reset Logic
  // ==========================================================
  describe("Password Reset Verification", () => {
    it("should verify reset password OTP successfully", () => {
      const otp = createMockOTP("999999", false, true);
      user.setOTPForResetPassword(otp);

      user.verifiedResetPasswordOTP("999999");

      expect(user.getVerifiedResetPassword()).toBe(true);
      expect(user.getOTPForResetPassword()).toBeUndefined(); // Should be cleared
    });

    it("should throw if reset password is already verified", () => {
      user.verifyResetPassword(); // Force true
      expect(() => user.verifiedResetPasswordOTP("123")).toThrow(
        "reset password been verified !!",
      );
    });

    it("should throw if no OTP is set", () => {
      expect(() => user.verifiedResetPasswordOTP("123")).toThrow(
        "no otp been reset !!",
      );
    });

    it("should throw if OTP is expired", () => {
      const expiredOtp = createMockOTP("123", true, true);
      user.setOTPForResetPassword(expiredOtp);
      expect(() => user.verifiedResetPasswordOTP("123")).toThrow(
        "otp expired !!",
      );
    });
  });

  // ==========================================================
  // 4. Account Status & Access Control
  // ==========================================================

  describe("Account Status (ensureAccountIsActive)", () => {
    it("should allow access if active and email verified", () => {
      user.activatedAccount();
      user.verifiedEmail();

      expect(() => user.ensureAccountIsActive()).not.toThrow();
    });

    it("should throw if account is deactivated", () => {
      user.deactivateAccount();
      expect(() => user.ensureAccountIsActive()).toThrow(
        "Access Denied: your account is deactivated",
      );
    });

    it("should throw if account is banned", () => {
      user.banAccount();
      expect(() => user.ensureAccountIsActive()).toThrow(
        "Access Denied: you account been banded !!",
      );
    });

    it("should throw if email is not verified (even if active)", () => {
      user.activatedAccount();
      user.resetVerifiedEmail(); // Ensure false

      expect(() => user.ensureAccountIsActive()).toThrow(
        "You have to verified you account before to go to your functionality",
      );
    });
  });

  // ==========================================================
  // 5. Profile Management
  // ==========================================================
  describe("Profile Management", () => {
    it("should update profile fields correctly", () => {
      const newName = { getValue: () => "Jane Doe" } as unknown as UserName;
      const newPhone = {
        getValue: () => "987654321",
      } as unknown as userPhoneNumber;

      user.updateProfile(
        newName,
        undefined,
        newPhone,
        "new-password",
        "new-photo.jpg",
      );

      expect(user.getName()).toBe("Jane Doe");
      expect(user.getPhoneNumber()).toBe("987654321");
      expect(user.getPass()).toBe("new-password");
      expect(user.getPhoto()).toBe("new-photo.jpg");

      expect(user.getDateOfBirth()).toBe("1990-01-01");
    });

    it("should set address", () => {
      user.setAddress("New Address 55");
      expect(user.getAddress()).toBe("New Address 55");
    });
  });
});
