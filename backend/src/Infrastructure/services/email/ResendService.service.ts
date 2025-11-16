// import { Resend } from "resend";
// import { IEmailService } from "../../../Core/services/IEmailService.service";
// import { EmailServiceError } from "../../Error/EmailServiceError.error";
// import { emailMessageStyleFormate } from "../../../Shared/constants/emailStyle.constant";
// import 'dotenv/config';

// export class ResendEmailService implements IEmailService {
//   private resend: Resend;

//   constructor() {
//     if (!process.env.RESEND_API_KEY) {
//       console.error("❌ Missing RESEND_API_KEY environment variable");
//       throw new EmailServiceError("Email service not configured", 503);
//     }
//     this.resend = new Resend(process.env.RESEND_API_KEY);
//   }

//   private generateOtpHtml(title: string, message: string, otp: string): string {
//     return emailMessageStyleFormate(title, message, otp, new Date());
//   }

//   public async sendRegistrationEmail(to: string, otp: string): Promise<void> {
//     try {
//       await this.resend.emails.send({
//         from: "Student Nest <noreply@resend.dev>",
//         to,
//         subject: "OTP Verification for Student Nest",
//         html: this.generateOtpHtml(
//           "Student Nest OTP Verification",
//           "Thanks for joining <strong>Student Nest</strong>. Use the OTP below to verify your email.",
//           otp
//         ),
//       });
//     } catch (error: any) {
//       console.error("Resend sendRegistrationEmail failed:", error.message);
//       throw new EmailServiceError("Failed to send verification email", 500);
//     }
//   }

//   public async resendOtpEmail(to: string, otp: string): Promise<void> {
//     try {
//       await this.resend.emails.send({
//         from: "Student Nest <noreply@resend.dev>",
//         to,
//         subject: "Resend OTP Verification - Student Nest",
//         html: this.generateOtpHtml(
//           "Student Nest - Resend OTP",
//           "Here’s your new OTP to verify your email for <strong>Student Nest</strong>.",
//           otp
//         ),
//       });
//     } catch (error: any) {
//       console.error("Resend resendOtpEmail failed:", error.message);
//       throw new EmailServiceError("Failed to resend OTP email", 500);
//     }
//   }

//   public async sendPasswordResetEmail(to: string, otp: string): Promise<void> {
//     try {
//       await this.resend.emails.send({
//         from: "Student Nest <noreply@resend.dev>",
//         to,
//         subject: "Password Reset OTP - Student Nest",
//         html: this.generateOtpHtml(
//           "Student Nest - Password Reset",
//           "Use this OTP to reset your password for <strong>Student Nest</strong>.",
//           otp
//         ),
//       });
//     } catch (error: any) {
//       console.error("Resend sendPasswordResetEmail failed:", error.message);
//       throw new EmailServiceError("Failed to send password reset email", 500);
//     }
//   }
// }
