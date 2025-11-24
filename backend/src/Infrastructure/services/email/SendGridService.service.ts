import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { IEmailService } from "../../../Application/interfaces/IEmail.interface";
import { emailMessageStyleFormate } from "../../../Shared/constants/emailStyle.constant";
import "dotenv/config";

export class SendGridService implements IEmailService {
  private readonly apiKey = process.env.STUNDENT_NEST_EMAIL_PROVIDER_KEY;
  private readonly fromEmail = process.env.STUNDENT_NEST_EMAIL;
  private readonly fromName = process.env.SENDGRID_FROM_NAME || "Student Nest Application";

  constructor() {
    if (!this.apiKey) {
      console.error("SendGrid API key is missing.");
      throw new Error("Email Service is not available");
    }

    if (!this.fromEmail) {
      console.error("SendGrid from email is missing.");
      throw new Error("Email Service is not available");
    }

    sgMail.setApiKey(this.apiKey);
  }

  // Reusable private method to generate OTP email HTML
  private generateOtpHtml(title: string, message: string, otp: string): string {
    return emailMessageStyleFormate(title, message, otp, new Date());
  }

  // Reusable private method to send email
  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const msg: MailDataRequired = {
      to,
      from: {
        email: this.fromEmail!,
        name: this.fromName,
      },
      subject,
      html,
    };

    try {
      await sgMail.send(msg);
    } catch (error: any) {
      console.error("SendGrid error:", error.response?.body || error.message);
      throw new Error("Failed to send email");
    }
  }

  // Registration OTP email
  public async sendRegistrationEmail(to: string, otp: string): Promise<void> {
    try {
      const html = this.generateOtpHtml(
        "Student Nest OTP Verification",
        "Thanks for joining Student Nest Application. To complete your registration, please use the OTP below to verify your email address.",
        otp
      );

      await this.sendEmail(
        to,
        "OTP Verification for Student Nest",
        html
      );
    } catch (error: any) {
      console.error("Registration email failed:", error.message);
      throw new Error("Failed to send verification email");
    }
  }

  // Resend OTP email
  public async resendOtpEmail(to: string, otp: string): Promise<void> {
    try {
      const html = this.generateOtpHtml(
        "Student Nest - Resend OTP",
        "You requested a new OTP code to verify your email with Student Nest Application.",
        otp
      );

      await this.sendEmail(
        to,
        "Resend OTP Verification - Student Nest",
        html
      );
    } catch (error: any) {
      console.error("Resend OTP email failed:", error.message);
      throw new Error("Failed to resend verification email");
    }
  }

  // Password reset OTP email
  public async sendPasswordResetEmail(to: string, otp: string): Promise<void> {
    try {
      const html = this.generateOtpHtml(
        "Student Nest - Password Reset",
        "Use the following OTP to reset your password for Student Nest Application.",
        otp
      );

      await this.sendEmail(
        to,
        "Password Reset OTP - Student Nest",
        html
      );
    } catch (error: any) {
      console.error("Password reset email failed:", error.message);
      throw new Error("Failed to send password reset OTP email");
    }
  }
}