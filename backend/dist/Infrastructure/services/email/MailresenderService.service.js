"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerSendAdapter = void 0;
const mailersend_1 = require("mailersend");
class MailerSendAdapter {
    constructor() {
        const apiKey = process.env.MAILERSEND_API_KEY;
        if (!apiKey) {
            throw new Error("MAILERSEND_API_KEY is not defined in environment variables");
        }
        this.mailerSend = new mailersend_1.MailerSend({
            apiKey: apiKey,
        });
        this.sender = new mailersend_1.Sender("abdalrahmanalkayyali48@gmail.com", "Student Nest Support");
    }
    sendRegistrationEmail(to, otp) {
        throw new Error("Method not implemented.");
    }
    async resendOtpEmail(email, otp) {
        const subject = "Your OTP Verification Code";
        const htmlContent = `
      <h1>Verification Code</h1>
      <p>Your One-Time Password is: <strong>${otp}</strong></p>
      <p>This code will expire shortly.</p>
    `;
        const textContent = `Your One-Time Password is: ${otp}`;
        await this.sendEmailInternal(email, subject, htmlContent, textContent);
    }
    async sendPasswordResetEmail(email, otp) {
        const subject = "Reset Your Password";
        const htmlContent = `
      <h1>Password Reset</h1>
      <p>You requested to reset your password. Use the code below:</p>
      <h2>${otp}</h2>
    `;
        const textContent = `You requested to reset your password. Use this code: ${otp}`;
        await this.sendEmailInternal(email, subject, htmlContent, textContent);
    }
    async sendEmailInternal(to, subject, html, text) {
        try {
            const recipients = [new mailersend_1.Recipient(to)];
            const emailParams = new mailersend_1.EmailParams()
                .setFrom(this.sender)
                .setTo(recipients)
                .setReplyTo(this.sender)
                .setSubject(subject)
                .setHtml(html)
                .setText(text);
            await this.mailerSend.email.send(emailParams);
            console.log(`Email sent successfully to ${to} via MailerSend`);
        }
        catch (error) {
            console.error("MailerSend Error:", error.body || error.message);
            throw new Error("Failed to send email via notification service.");
        }
    }
}
exports.MailerSendAdapter = MailerSendAdapter;
