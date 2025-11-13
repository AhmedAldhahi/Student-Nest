"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const EmailServiceError_error_1 = require("../../Error/EmailServiceError.error");
const emailStyle_constant_1 = require("../../../Shared/constants/emailStyle.constant");
require("dotenv/config");
class NodemailerService {
    constructor() {
        this.emailServiceAddress = process.env.NODEMAILER_GMAIL_USER;
        this.emailServicePass = process.env.NODEMAILER_GMAIL_PASSWORD;
        if (!this.emailServiceAddress || !this.emailServicePass) {
            console.error("Email service is broken.");
            throw new EmailServiceError_error_1.EmailServiceError("Email Service is not available", 503);
        }
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: this.emailServiceAddress,
                pass: this.emailServicePass,
            },
        });
    }
    generateOtpHtml(title, message, otp) {
        return (0, emailStyle_constant_1.emailMessageStyleFormate)(title, message, otp, new Date());
    }
    async sendRegistrationEmail(to, otp) {
        try {
            await this.transporter.sendMail({
                from: `"Student Nest Application" <${this.emailServiceAddress}>`,
                to,
                subject: "OTP Verification for Student Nest",
                html: this.generateOtpHtml("Student Nest OTP Verification", "Thanks for joining <strong>Student Nest Application</strong>. To complete your registration, please use the OTP below to verify your email address.", otp),
            });
        }
        catch (error) {
            console.error("Email sending failed:", error.message);
            throw new EmailServiceError_error_1.EmailServiceError("Failed to send verification email", 500);
        }
    }
    async resendOtpEmail(to, otp) {
        try {
            await this.transporter.sendMail({
                from: `"Student Nest Application" <${this.emailServiceAddress}>`,
                to,
                subject: "Resend OTP Verification - Student Nest",
                html: this.generateOtpHtml("Student Nest - Resend OTP", "You requested a new OTP code to verify your email with <strong>Student Nest Application</strong>.", otp),
            });
        }
        catch (error) {
            console.error("Resend OTP email failed:", error.message);
            throw new EmailServiceError_error_1.EmailServiceError("Failed to resend verification email", 500);
        }
    }
    async sendPasswordResetEmail(to, otp) {
        try {
            await this.transporter.sendMail({
                from: `"Student Nest Application" <${this.emailServiceAddress}>`,
                to,
                subject: "Password Reset OTP - Student Nest",
                html: this.generateOtpHtml("Student Nest - Password Reset", "Use the following OTP to reset your password for <strong>Student Nest Application</strong>.", otp),
            });
        }
        catch (error) {
            console.error("Password reset email failed:", error.message);
            throw new EmailServiceError_error_1.EmailServiceError("Failed to send password reset OTP email", 500);
        }
    }
}
exports.NodemailerService = NodemailerService;
