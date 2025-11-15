"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendEmailService = void 0;
const resend_1 = require("resend");
const EmailServiceError_error_1 = require("../../Error/EmailServiceError.error");
const emailStyle_constant_1 = require("../../../Shared/constants/emailStyle.constant");
require("dotenv/config");
class ResendEmailService {
    constructor() {
        if (!process.env.RESEND_API_KEY) {
            console.error("❌ Missing RESEND_API_KEY environment variable");
            throw new EmailServiceError_error_1.EmailServiceError("Email service not configured", 503);
        }
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    generateOtpHtml(title, message, otp) {
        return (0, emailStyle_constant_1.emailMessageStyleFormate)(title, message, otp, new Date());
    }
    async sendRegistrationEmail(to, otp) {
        try {
            await this.resend.emails.send({
                from: "Student Nest <noreply@resend.dev>",
                to,
                subject: "OTP Verification for Student Nest",
                html: this.generateOtpHtml("Student Nest OTP Verification", "Thanks for joining <strong>Student Nest</strong>. Use the OTP below to verify your email.", otp),
            });
        }
        catch (error) {
            console.error("Resend sendRegistrationEmail failed:", error.message);
            throw new EmailServiceError_error_1.EmailServiceError("Failed to send verification email", 500);
        }
    }
    async resendOtpEmail(to, otp) {
        try {
            await this.resend.emails.send({
                from: "Student Nest <noreply@resend.dev>",
                to,
                subject: "Resend OTP Verification - Student Nest",
                html: this.generateOtpHtml("Student Nest - Resend OTP", "Here’s your new OTP to verify your email for <strong>Student Nest</strong>.", otp),
            });
        }
        catch (error) {
            console.error("Resend resendOtpEmail failed:", error.message);
            throw new EmailServiceError_error_1.EmailServiceError("Failed to resend OTP email", 500);
        }
    }
    async sendPasswordResetEmail(to, otp) {
        try {
            await this.resend.emails.send({
                from: "Student Nest <noreply@resend.dev>",
                to,
                subject: "Password Reset OTP - Student Nest",
                html: this.generateOtpHtml("Student Nest - Password Reset", "Use this OTP to reset your password for <strong>Student Nest</strong>.", otp),
            });
        }
        catch (error) {
            console.error("Resend sendPasswordResetEmail failed:", error.message);
            throw new EmailServiceError_error_1.EmailServiceError("Failed to send password reset email", 500);
        }
    }
}
exports.ResendEmailService = ResendEmailService;
