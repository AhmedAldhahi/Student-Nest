"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserGovId_vo_1 = require("../../../../src/Core/value-object/UserGovId.vo");
describe("validate Government id value object", () => {
    describe("validate the Government id", () => {
        test("must have 10 digits exactly", () => {
            const input = "1234567890";
            const govId = new UserGovId_vo_1.GovernmentID(input);
            expect(govId.getValue()).toBe(input);
        });
    });
    describe("Invalid Government Id", () => {
        describe("invalid digit size", () => {
            test("the digit is less than 10 digits", () => {
                const input = "123456789";
                expect(() => new UserGovId_vo_1.GovernmentID(input)).toThrow("User Government ID number must be exactly 10 digits.");
            });
            test("the digit is more than 10 digits", () => {
                const input = "123456789101112";
                expect(() => new UserGovId_vo_1.GovernmentID(input)).toThrow("User Government ID number must be exactly 10 digits.");
            });
        });
        describe("invalid characters", () => {
            test("it should not allow special characters", () => {
                const input = "1234@67890";
                expect(() => new UserGovId_vo_1.GovernmentID(input)).toThrow("User Government ID number must contain only numeric digits.");
            });
            test("it should not allow alphabetic characters", () => {
                const input = "1234A67890";
                expect(() => new UserGovId_vo_1.GovernmentID(input)).toThrow("User Government ID number must contain only numeric digits.");
            });
            test("it should not allow spaces", () => {
                const input = "123 456789";
                expect(() => new UserGovId_vo_1.GovernmentID(input)).toThrow("User Government ID number must contain only numeric digits.");
            });
        });
        describe("invalid format", () => {
            test("it should not allow negative numbers", () => {
                const input = "-1234567890";
                expect(() => new UserGovId_vo_1.GovernmentID(input)).toThrow("Negative numbers are not allowed.");
            });
            test("it should not allow leading zeros", () => {
                const input = "0123456789";
                expect(() => new UserGovId_vo_1.GovernmentID(input)).toThrow("User Government ID cannot start with a leading zero.");
            });
        });
    });
});
