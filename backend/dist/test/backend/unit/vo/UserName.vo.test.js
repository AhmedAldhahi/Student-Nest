"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserName_vo_1 = require("../../../../src/Core/value-object/UserName.vo");
describe("user name value object validation", () => {
    describe("validate user name Object", () => {
        test("should create valid user name with start length at least 3 ", () => {
            const input = "ann";
            const userName = new UserName_vo_1.UserName(input);
            expect(userName.getValue()).toBe(input);
        });
        test("should user name not been null ", () => {
            const input = "ahmad";
            const userName = new UserName_vo_1.UserName(input);
            expect(userName.getValue()).toBe(input);
        });
        test("should user name  start with alphabetic  ", () => {
            const input = "ahmad";
            const userName = new UserName_vo_1.UserName(input);
            expect(userName.getValue()).toBe(input);
        });
        test("should user name not have whitespace ", () => {
            const input = "ahmad   ";
            const userName = new UserName_vo_1.UserName(input);
            expect(userName.getValue()).toBe(input);
        });
        test("should name length  at most 25 ", () => {
            const input = "ahmad";
            const userName = new UserName_vo_1.UserName(input);
            expect(userName.getValue()).toBe(input);
        });
        test("it not have any symbol charter ", () => {
            const input = "ahmad_";
            const userName = new UserName_vo_1.UserName(input);
            expect(userName.getValue()).toBe(input);
        });
        test("it allow have any number or underscore but not first charter ", () => {
            const input = "ahmad_3";
            const userName = new UserName_vo_1.UserName(input);
            expect(userName.getValue()).toBe(input);
        });
    });
    describe("invalid user name object", () => {
        test("should not create user name with length less than 3", () => {
            const input = "a";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("User name is too short or null");
        });
        test("should not create user name with null value", () => {
            const input = "";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("User name is required");
        });
        test("should not create user name with whitespace only", () => {
            const input = "   ";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("User name is too short or null");
        });
        test("should not create user name starting with a number", () => {
            const input = "3ahmad";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("Name must start with a letter and can only contain letters, numbers, or underscores");
        });
        test("should not create user name with more than 25 characters", () => {
            const input = "a".repeat(26);
            expect(() => new UserName_vo_1.UserName(input)).toThrow("UserName must be at most 25 characters long.");
        });
        test("should not create user name with symbols", () => {
            const input = "ahmad!";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("Name must start with a letter and can only contain letters, numbers, or underscores");
        });
        test("should not create user name with space in the middle", () => {
            const input = "ah mad";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("Name must start with a letter and can only contain letters, numbers, or underscores");
        });
        test("should not create user name starting with an underscore", () => {
            const input = "_ahmad";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("Name must start with a letter and can only contain letters, numbers, or underscores");
        });
        test("should not create user name with only numbers", () => {
            const input = "123";
            expect(() => new UserName_vo_1.UserName(input)).toThrow("Name must start with a letter and can only contain letters, numbers, or underscores");
        });
    });
});
