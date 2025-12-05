"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OTP_vo_1 = require("../../../../src/Core/value-object/OTP.vo");
describe('OTP Value Object', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    describe('Static Generation', () => {
        it('should generate a 6-digit numeric string', () => {
            const otp = OTP_vo_1.OTP.generate();
            const value = otp.getValue();
            expect(value).toMatch(/^\d{6}$/);
        });
        it('should create a distinct instance on every call', () => {
            const otp1 = OTP_vo_1.OTP.generate();
            const otp2 = OTP_vo_1.OTP.generate();
            expect(otp1).not.toBe(otp2);
            expect(otp1.getValue()).not.toBe(otp2.getValue());
        });
        it('should default to 10 minutes expiration', () => {
            const now = new Date('2023-01-01T10:00:00Z');
            jest.setSystemTime(now);
            const otp = OTP_vo_1.OTP.generate();
            const expectedExpiry = new Date('2023-01-01T10:10:00Z');
            expect(otp.getExpiresAt().toISOString()).toBe(expectedExpiry.toISOString());
        });
    });
    describe('Constructor & State', () => {
        it('should allow custom expiration times', () => {
            const now = new Date('2023-01-01T10:00:00Z');
            jest.setSystemTime(now);
            const otp = new OTP_vo_1.OTP('123456', 5);
            const expectedExpiry = new Date('2023-01-01T10:05:00Z');
            expect(otp.getExpiresAt().toISOString()).toBe(expectedExpiry.toISOString());
        });
    });
    describe('Expiration Logic (Time Travel)', () => {
        it('should NOT be expired immediately after creation', () => {
            jest.setSystemTime(new Date());
            const otp = OTP_vo_1.OTP.generate();
            expect(otp.isExpired()).toBe(false);
        });
        it('should NOT be expired 1 millisecond before deadline', () => {
            const now = new Date('2023-01-01T10:00:00Z');
            jest.setSystemTime(now);
            const otp = new OTP_vo_1.OTP('123456', 10);
            jest.setSystemTime(new Date('2023-01-01T10:09:59.999Z'));
            expect(otp.isExpired()).toBe(false);
        });
        it('should be expired 1 millisecond after deadline', () => {
            const now = new Date('2023-01-01T10:00:00Z');
            jest.setSystemTime(now);
            const otp = new OTP_vo_1.OTP('123456', 10);
            jest.setSystemTime(new Date('2023-01-01T10:10:00.001Z'));
            expect(otp.isExpired()).toBe(true);
        });
    });
    describe('Verification Logic (verfiedOtp)', () => {
        const FIXED_CODE = '555555';
        let otp;
        beforeEach(() => {
            jest.setSystemTime(new Date('2023-01-01T10:00:00Z'));
            otp = new OTP_vo_1.OTP(FIXED_CODE, 10);
        });
        it('should return true for a valid code within the time limit', () => {
            expect(otp.verfiedOtp(FIXED_CODE)).toBe(true);
        });
        it('should throw "Invalid OTP code." when code does not match', () => {
            const wrongCode = '999999';
            expect(() => {
                otp.verfiedOtp(wrongCode);
            }).toThrow('Invalid OTP code.');
        });
        it('should throw "OTP has expired." if time has passed, even if code is correct', () => {
            jest.advanceTimersByTime(11 * 60 * 1000);
            expect(() => {
                otp.verfiedOtp(FIXED_CODE);
            }).toThrow('OTP has expired.');
        });
        it('should prioritize expiration check over invalid code check', () => {
            jest.advanceTimersByTime(11 * 60 * 1000);
            expect(() => {
                otp.verfiedOtp('WRONG_CODE');
            }).toThrow('OTP has expired.');
        });
    });
});
