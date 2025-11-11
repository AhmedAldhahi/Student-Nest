export function emailMessageStyleFormate(
    title: string,
    message: string,
    otp: string,
    year: Date
  ): string { 
    
    // Your chosen blue colors
    const primaryColor = "#1E3A8A";   // Dark Blue
    const secondaryColor = "#3B82F6"; // Lighter Blue

    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        /* CSS variables are removed as they are not supported in all email clients */
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f4f6fa;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .email-wrapper {
          width: 100%;
          padding: 20px;
          background-color: #f4f6fa;
        }
        .email-container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .email-header {
          /* Use the hex code directly */
          background-color: ${primaryColor}; 
          padding: 30px 20px;
          text-align: center;
          color: #ffffff;
        }
        .email-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .email-body {
          padding: 30px 20px;
          color: #555;
        }
        .email-body p {
          font-size: 16px;
          line-height: 1.6;
          margin: 15px 0;
        }
        .otp-box {
          text-align: center;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 32px;
          font-weight: bold;
          color:rgb(255, 255, 255); /* This is fine now */
          /* Use the hex code directly */
          background-color: ${secondaryColor}; 
          padding: 15px 40px;
          border-radius: 12px;
          letter-spacing: 4px;
          display: inline-block;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .expiry-note {
          font-size: 14px;
          color: #888;
          text-align: center;
          margin-top: 10px;
        }
        .email-footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #aaa;
          background-color:rgb(44, 91, 185);
        }
        @media screen and (max-width: 480px) {
          .otp-code {
            padding: 12px 25px;
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-container">
          <div class="email-header">
            <h1>Student Nest</h1>
          </div>
          <div class="email-body">
            <p>${message}</p>
            <div class="otp-box">
              <span class="otp-code">${otp}</span>
            </div>
            <p class="expiry-note">
              This OTP is valid for 10 minutes. If you did not request this, please ignore this message.
            </p>
          </div>
          <div class="email-footer">
            © ${year.getFullYear()} Student Nest Application. All rights reserved.
          </div>
        </div>
      </div>
    </body>
  </html>`;
  }