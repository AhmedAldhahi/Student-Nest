"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserEmail_vo_1 = require("../../../../src/Core/value-object/UserEmail.vo");
describe("validate UserEmail value object", () => {
    describe("validate the UserEmail", () => {
        test("must have a valid email format and a minimum length of 10 characters", () => {
            const input = "test@example.com";
            const userEmail = new UserEmail_vo_1.UserEmail(input);
            expect(userEmail.getValue()).toBe(input);
        });
    });
    describe("Invalid UserEmail", () => {
        describe("invalid format", () => {
            test("it should not allow an invalid email format (missing @)", () => {
                const input = "testexample.com";
                expect(() => new UserEmail_vo_1.UserEmail(input)).toThrow("A valid email is required.");
            });
            test("it should not allow an invalid email format (missing .)", () => {
                const input = "test@com";
                expect(() => new UserEmail_vo_1.UserEmail(input)).toThrow("A valid email is required.");
            });
            test("it should not allow an invalid email format (spaces)", () => {
                const input = "test @example.com";
                expect(() => new UserEmail_vo_1.UserEmail(input)).toThrow("A valid email is required.");
            });
        });
        describe("invalid length", () => {
            test("it should not allow an email with less than 10 characters", () => {
                const input = "a@b.c";
                expect(() => new UserEmail_vo_1.UserEmail(input)).toThrow("A valid email is required.");
            });
            test("it should not allow an empty email", () => {
                const input = "";
                expect(() => new UserEmail_vo_1.UserEmail(input)).toThrow("A valid email is required.");
            });
            test("it should not allow a null email", () => {
                const input = "";
                expect(() => new UserEmail_vo_1.UserEmail(input)).toThrow("A valid email is required.");
            });
        });
    });
});
