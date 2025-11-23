import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { IEmailService } from "../../../Application/interfaces/IEmail.interface";

export class MailerSendAdapter implements IEmailService {
  private readonly mailerSend: MailerSend;
  private readonly sender: Sender;

  constructor() {
    // Initialize the library with the API Key from environment variables
    // It is safer to check if the key exists to avoid runtime errors
    const apiKey = process.env.MAILERSEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "MAILERSEND_API_KEY is not defined in environment variables"
      );
    }

    this.mailerSend = new MailerSend({
      apiKey: apiKey,
    });

    // Initialize the default sender (You can also load these from env vars)
    this.sender = new Sender(
      "abdalrahmanalkayyali48@gmail.com",
      "Student Nest Support"
    );
  }
  sendRegistrationEmail(to: string, otp: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // Implementation of the first contract method
  public async resendOtpEmail(email: string, otp: string): Promise<void> {
    const subject = "Your OTP Verification Code";
    const htmlContent = `
      <h1>Verification Code</h1>
      <p>Your One-Time Password is: <strong>${otp}</strong></p>
      <p>This code will expire shortly.</p>
    `;
    const textContent = `Your One-Time Password is: ${otp}`;

    await this.sendEmailInternal(email, subject, htmlContent, textContent);
  }

  // Implementation of the second contract method
  public async sendPasswordResetEmail(
    email: string,
    otp: string
  ): Promise<void> {
    const subject = "Reset Your Password";
    const htmlContent = `
      <h1>Password Reset</h1>
      <p>You requested to reset your password. Use the code below:</p>
      <h2>${otp}</h2>
    `;
    const textContent = `You requested to reset your password. Use this code: ${otp}`;

    await this.sendEmailInternal(email, subject, htmlContent, textContent);
  }

  /**
   * Private helper to handle the specific syntax of MailerSend.
   * This prevents duplicating the recipient/params setup in every public method.
   */
  private async sendEmailInternal(
    to: string,
    subject: string,
    html: string,
    text: string
  ): Promise<void> {
    try {
      const recipients = [new Recipient(to)];

      const emailParams = new EmailParams()
        .setFrom(this.sender)
        .setTo(recipients)
        .setReplyTo(this.sender)
        .setSubject(subject)
        .setHtml(html)
        .setText(text);

      await this.mailerSend.email.send(emailParams);

      console.log(`Email sent successfully to ${to} via MailerSend`);
    } catch (error: any) {
      // Log the error from the provider for debugging
      console.error("MailerSend Error:", error.body || error.message);

      // Throw a generic error so your Use Case doesn't crash with provider-specific details
      throw new Error("Failed to send email via notification service.");
    }
  }
}
