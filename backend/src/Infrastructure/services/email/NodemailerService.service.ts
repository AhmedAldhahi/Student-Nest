import nodemailer, { Transporter } from "nodemailer";
import { IEmailService } from "../../../Application/interfaces/IEmail.interface";
import { emailMessageStyleFormate } from "../../../Shared/constants/emailStyle.constant";
import "dotenv/config";

export class NodemailerService implements IEmailService {
  private transporter: Transporter;
  private readonly emailServiceAddress = process.env.NODEMAILER_GMAIL_USER;
  private readonly emailServicePass = process.env.NODEMAILER_GMAIL_PASSWORD;

  constructor() {
    if (!this.emailServiceAddress || !this.emailServicePass) {
      console.error("Email service is broken.");
      throw new Error("Email Service is not available");
    }

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.emailServiceAddress,
        pass: this.emailServicePass,
      },
    });
  }

  // Reusable private method to generate OTP email HTML
  private generateOtpHtml(title: string, message: string, otp: string): string {
    return emailMessageStyleFormate(title, message, otp, new Date());
  }

  // Registration OTP email
  public async sendRegistrationEmail(to: string, otp: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Student Nest Application" <${this.emailServiceAddress}>`,
        to,
        subject: "OTP Verification for Student Nest",
        html: this.generateOtpHtml(
          "Student Nest OTP Verification",
          "Thanks for joining <strong>Student Nest Application</strong>. To complete your registration, please use the OTP below to verify your email address.",
          otp
        ),
      });
    } catch (error: any) {
      console.error("Email sending failed:", error.message);
      throw new Error("Failed to send verification email");
    }
  }

  // Resend OTP email
  public async resendOtpEmail(to: string, otp: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Student Nest Application" <${this.emailServiceAddress}>`,
        to,
        subject: "Resend OTP Verification - Student Nest",
        html: this.generateOtpHtml(
          "Student Nest - Resend OTP",
          "You requested a new OTP code to verify your email with <strong>Student Nest Application</strong>.",
          otp
        ),
      });
    } catch (error: any) {
      console.error("Resend OTP email failed:", error.message);
      throw new Error("Failed to resend verification email");
    }
  }

  // Password reset OTP email
  public async sendPasswordResetEmail(to: string, otp: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Student Nest Application" <${this.emailServiceAddress}>`,
        to,
        subject: "Password Reset OTP - Student Nest",
        html: this.generateOtpHtml(
          "Student Nest - Password Reset",
          "Use the following OTP to reset your password for <strong>Student Nest Application</strong>.",
          otp
        ),
      });
    } catch (error: any) {
      console.error("Password reset email failed:", error.message);
      throw new Error("Failed to send password reset OTP email");
    }
  }
}
