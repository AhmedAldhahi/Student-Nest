import nodemailer, { Transporter } from "nodemailer";
import { EmailServiceError } from "../../Error/EmailServiceError.error";
import { IEmailService } from "../../../Core/services/IEmailService.service";
import { emailMessageStyleFormate } from "../../../Shared/constants/emailStyle.constant";
import 'dotenv/config';

export class NodemailerService implements IEmailService {
  private transporter: Transporter;
  private readonly emailServiceAddress = process.env.NODEMAILER_GMAIL_USER;//|| "abdalrahmanalkayyali48@gmail.com";
  private readonly emailServicePass = process.env.NODEMAILER_GMAIL_PASSWORD; //|| "nptyhtdyzcdftskt";

  constructor() {
    if (!this.emailServiceAddress || !this.emailServicePass) {
      console.error("Email service is broken.");
      throw new EmailServiceError("Email Service is not available", 503);
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
    return emailMessageStyleFormate(title,message,otp,new Date());
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
      throw new EmailServiceError("Failed to send verification email", 500);
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
      throw new EmailServiceError("Failed to resend verification email", 500);
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
      throw new EmailServiceError(
        "Failed to send password reset OTP email",
        500
      );
    }
  } 


  
}
