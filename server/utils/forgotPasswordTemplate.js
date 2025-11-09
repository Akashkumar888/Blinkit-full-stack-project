export const forgotPasswordTemplate = (name, otp) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      
      <h2 style="color: #0d6efd;">Password Reset Request</h2>
      
      <p>Dear <strong>${name}</strong>,</p>

      <p>You have requested to reset your password for your Blinkit account. Please use the OTP given below to proceed.</p>
      
      <div style="
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 4px;
        color: #0d6efd;
        margin: 20px 0;
      ">
        ${otp}
      </div>

      <p>This OTP is valid for <strong>1 hour</strong>. Enter this code on the Blinkit website to reset your password.</p>

      <p>If you did not request this, please ignore this email. Your account is safe.</p>

      <br/>

      <p>Thanks & Regards,<br/><strong>Blinkit Team</strong></p>
    </div>
  `;
};
