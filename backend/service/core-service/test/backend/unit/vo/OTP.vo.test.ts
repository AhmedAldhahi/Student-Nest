import { OTP } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";

describe("OTP Value Object", () => {
  
  // =========================================================
  // 1. Static Generation Tests
  // =========================================================
  describe("generate()", () => {
    test("should generate a 6-digit numerical string", () => {
      const otp = OTP.generate();
      const value = otp.getValue();

      // Regex: ^ start, \d digit, {6} exactly 6 times, $ end
      expect(value).toMatch(/^\d{6}$/);
    });

    test("should set expiration to exactly 10 minutes from now", () => {
      // 1. Freeze time to a known point
      const mockNow = new Date("2025-01-01T12:00:00Z");
      jest.useFakeTimers().setSystemTime(mockNow);

      // 2. Generate OTP
      const otp = OTP.generate();

      // 3. Expected time: 12:00 + 10 mins = 12:10
      const expectedExpiry = new Date("2025-01-01T12:10:00Z");
      
      expect(otp.getExpiresAt().toISOString()).toBe(expectedExpiry.toISOString());

      // 4. Clean up timers
      jest.useRealTimers();
    });
  });

  // =========================================================
  // 2. Verification Logic Tests
  // =========================================================
  describe("verified Otp()", () => {
    
    test("should return true for a valid, non-expired OTP", () => {
      // Create an OTP that expires in the future (1 hour from now)
      const futureDate = new Date(Date.now() + 60 * 60 * 1000); 
      const otp = new OTP("123456", futureDate);

      // Act & Assert
      expect(otp.verfiedOtp("123456")).toBe(true);
    });

    test("should throw error if the provided code does not match", () => {
      const futureDate = new Date(Date.now() + 10000);
      const otp = new OTP("123456", futureDate);

      expect(() => {
        otp.verfiedOtp("999999"); // Wrong code
      }).toThrow("Invalid OTP code.");
    });

    test("should throw error if the OTP is expired", () => {
      // Create an OTP that expired 1 second ago
      const pastDate = new Date(Date.now() - 1000); 
      const otp = new OTP("123456", pastDate);

      expect(() => {
        otp.verfiedOtp("123456"); // Correct code, but expired
      }).toThrow("OTP has expired.");
    });
  });

  // =========================================================
  // 3. Expiration Status Tests (isExpired)
  // =========================================================
  describe("isExpired()", () => {
    
    test("should return true if current time > expiresAt", () => {
      const pastDate = new Date(Date.now() - 5000); // 5 sec ago
      const otp = new OTP("123456", pastDate);
      
      expect(otp.isExpired()).toBe(true);
    });

    test("should return false if current time < expiresAt", () => {
      const futureDate = new Date(Date.now() + 5000); // 5 sec future
      const otp = new OTP("123456", futureDate);
      
      expect(otp.isExpired()).toBe(false);
    });
  });

});