"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailtrapService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
class MailtrapService {
    constructor() {
        this.smtpUser = process.env.MAILTRAP_SMTP_USER || "api";
        this.smtpPass = process.env.MAILTRAP_SMTP_PASS || "<YOUR_API_TOKEN>";
        this.fromEmail = process.env.MAILTRAP_FROM_EMAIL || "hello@studentnest.cloud";
        this.fromName = process.env.MAILTRAP_FROM_NAME || "Mailtrap Test";
        if (!this.smtpUser || !this.smtpPass) {
            console.error("Mailtrap SMTP credentials are missing.");
            throw new Error("Email Service is not available");
        }
        this.transport = nodemailer_1.default.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "smtp@mailtrap.io",
                pass: "381fdefcd9bcad1777e5d598189ba153",
            },
        });
    }
    async sendEmail(to, subject, html) {
        const message = {
            from: {
                address: this.fromEmail,
                name: this.fromName,
            },
            to,
            subject,
            html,
            category: "Integration Test",
        };
        try {
            await this.transport.sendMail(message);
            console.log("Email sent successfully");
        }
        catch (error) {
            console.error("Mailtrap error:", error.message);
            throw new Error("Failed to send email");
        }
    }
    generateOtpHtml(title, message, otp) {
        return `
      <html>
        <head><title>${title}</title></head>
        <body>
          <h1>${title}</h1>
          <p>${message}</p>
          <p><strong>OTP:</strong> ${otp}</p>
        </body>
      </html>
    `;
    }
    async sendRegistrationEmail(to, otp) {
        try {
            const html = this.generateOtpHtml("Student Nest OTP Verification", "Thanks for joining Student Nest Application. To complete your registration, please use the OTP below to verify your email address.", otp);
            await this.sendEmail(to, "OTP Verification for Student Nest", html);
        }
        catch (error) {
            console.error("Registration email failed:", error.message);
            throw new Error("Failed to send registration email");
        }
    }
    async resendOtpEmail(to, otp) {
        try {
            const html = this.generateOtpHtml("Student Nest - Resend OTP", "You requested a new OTP code to verify your email with Student Nest Application.", otp);
            await this.sendEmail(to, "Resend OTP Verification - Student Nest", html);
        }
        catch (error) {
            console.error("Resend OTP email failed:", error.message);
            throw new Error("Failed to resend OTP email");
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
exports.MailtrapService = MailtrapService;
