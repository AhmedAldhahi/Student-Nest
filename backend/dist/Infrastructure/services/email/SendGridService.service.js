"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridService = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const emailStyle_constant_1 = require("../../../Shared/constants/emailStyle.constant");
require("dotenv/config");
class SendGridService {
    constructor() {
        this.apiKey = process.env.STUNDENT_NEST_EMAIL_PROVIDER_KEY;
        this.fromEmail = process.env.STUNDENT_NEST_EMAIL;
        this.fromName = process.env.SENDGRID_FROM_NAME || "Student Nest Application";
        if (!this.apiKey) {
            console.error("SendGrid API key is missing.");
            throw new Error("Email Service is not available");
        }
        if (!this.fromEmail) {
            console.error("SendGrid from email is missing.");
            throw new Error("Email Service is not available");
        }
        mail_1.default.setApiKey(this.apiKey);
    }
    generateOtpHtml(title, message, otp) {
        return (0, emailStyle_constant_1.emailMessageStyleFormate)(title, message, otp, new Date());
    }
    async sendEmail(to, subject, html) {
        const msg = {
            to,
            from: {
                email: this.fromEmail,
                name: this.fromName,
            },
            subject,
            html,
        };
        try {
            await mail_1.default.send(msg);
        }
        catch (error) {
            console.error("SendGrid error:", error.response?.body || error.message);
            throw new Error("Failed to send email");
        }
    }
    async sendRegistrationEmail(to, otp) {
        try {
            const html = this.generateOtpHtml("Student Nest OTP Verification", "Thanks for joining Student Nest Application. To complete your registration, please use the OTP below to verify your email address.", otp);
            await this.sendEmail(to, "OTP Verification for Student Nest", html);
        }
        catch (error) {
            console.error("Registration email failed:", error.message);
            throw new Error("Failed to send verification email");
        }
    }
    async resendOtpEmail(to, otp) {
        try {
            const html = this.generateOtpHtml("Student Nest - Resend OTP", "You requested a new OTP code to verify your email with Student Nest Application.", otp);
            await this.sendEmail(to, "Resend OTP Verification - Student Nest", html);
        }
        catch (error) {
            console.error("Resend OTP email failed:", error.message);
            throw new Error("Failed to resend verification email");
        }
    }
    async sendPasswordResetEmail(to, otp) {
        try {
            const html = this.generateOtpHtml("Student Nest - Password Reset", "Use the following OTP to reset your password for Student Nest Application.", otp);
            await this.sendEmail(to, "Password Reset OTP - Student Nest", html);
        }
        catch (error) {
            console.error("Password reset email failed:", error.message);
            throw new Error("Failed to send password reset OTP email");
        }
    }
}
exports.SendGridService = SendGridService;
