"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StudentVerficationDocument_vo_1 = require("../../../../src/Core/value-object/StudentVerficationDocument.vo");
describe("validate StudentVerificationDocument value object", () => {
    describe("valid document", () => {
        test("should accept valid document", () => {
            const input = "verification-document.pdf";
            const document = new StudentVerficationDocument_vo_1.StudentVerificationDocument(input);
            expect(document.getValue()).toBe(input);
        });
    });
    describe("Invalid document", () => {
        test("should throw an error if the document is empty", () => {
            const input = "";
            expect(() => new StudentVerficationDocument_vo_1.StudentVerificationDocument(input)).toThrow("validate document is required !!");
        });
        test("should throw an error if the document is null", () => {
            const input = "";
            expect(() => new StudentVerficationDocument_vo_1.StudentVerificationDocument(input)).toThrow("validate document is required !!");
        });
    });
});
