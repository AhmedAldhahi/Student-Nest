import nodemailer from "nodemailer";
import { IEmailService } from "../../../Application/interfaces/IEmail.interface";
import "dotenv/config";
import { emailMessageStyleFormate } from "../../../Shared/constants/emailStyle.constant";

export class MailtrapService implements IEmailService {
  private readonly smtpUser = process.env.MAILTRAP_SMTP_USER || "api"; // SMTP user from Mailtrap
  private readonly smtpPass =
    process.env.MAILTRAP_SMTP_PASS || "<YOUR_API_TOKEN>"; // SMTP pass (API token from Mailtrap)
  private readonly fromEmail =
    process.env.MAILTRAP_FROM_EMAIL || "hello@studentnest.cloud";
  private readonly fromName = process.env.MAILTRAP_FROM_NAME || "Mailtrap Test";

  private transport: nodemailer.Transporter;

  constructor() {
    if (!this.smtpUser || !this.smtpPass) {
      console.error("Mailtrap SMTP credentials are missing.");
      throw new Error("Email Service is not available");
    }

    // Create a Nodemailer transport using Mailtrap SMTP settings
    this.transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587, // The port for SMTP communication
      auth: {
        user: "smtp@mailtrap.io",
        pass: "381fdefcd9bcad1777e5d598189ba153",
      },
    });
  }

  // Reusable private method to send an email
  private async sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const message = {
      from: {
        address: this.fromEmail!,
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
    } catch (error: any) {
      console.error("Mailtrap error:", error.message);
      throw new Error("Failed to send email");
    }
  }

  // Method to generate OTP HTML content for the email

  private generateOtpHtml(title: string, message: string, otp: string): string {
    return emailMessageStyleFormate(title, message, otp, new Date());
  }

  // Implementation of sendRegistrationEmail from IEmailService
  public async sendRegistrationEmail(to: string, otp: string): Promise<void> {
    try {
      const html = this.generateOtpHtml(
        "Student Nest OTP Verification",
        "Thanks for joining Student Nest Application. To complete your registration, please use the OTP below to verify your email address.",
        otp
      );

      await this.sendEmail(to, "OTP Verification for Student Nest", html);
    } catch (error: any) {
      console.error("Registration email failed:", error.message);
      throw new Error("Failed to send registration email");
    }
  }

  // Implementation of resendOtpEmail from IEmailService
  public async resendOtpEmail(to: string, otp: string): Promise<void> {
    try {
      const html = this.generateOtpHtml(
        "Student Nest - Resend OTP",
        "You requested a new OTP code to verify your email with Student Nest Application.",
        otp
      );

      await this.sendEmail(to, "Resend OTP Verification - Student Nest", html);
    } catch (error: any) {
      console.error("Resend OTP email failed:", error.message);
      throw new Error("Failed to resend OTP email");
    }
  }

  // Implementation of sendPasswordResetEmail from IEmailService
  public async sendPasswordResetEmail(to: string, otp: string): Promise<void> {
    try {
      const html = this.generateOtpHtml(
        "Student Nest - Password Reset",
        "Use the following OTP to reset your password for Student Nest Application.",
        otp
      );

      await this.sendEmail(to, "Password Reset OTP - Student Nest", html);
    } catch (error: any) {
      console.error("Password reset email failed:", error.message);
      throw new Error("Failed to send password reset OTP email");
    }
  }
}
