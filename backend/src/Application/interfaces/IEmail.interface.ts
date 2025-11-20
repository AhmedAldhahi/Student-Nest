export interface IEmailService {
    sendRegistrationEmail(to: string, otp: string): Promise<void>;
    resendOtpEmail(to: string, otp: string): Promise<void>;
    sendPasswordResetEmail(to: string, otp: string): Promise<void>;
  }


