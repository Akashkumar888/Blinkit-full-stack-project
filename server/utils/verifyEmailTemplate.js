export const verifyEmailTemplate = ({ name, url }) => {
  return `
  <div style="font-family:Arial;padding:20px">
    <h2>Hi ${name},</h2>
    <p>Thank you for registering on <strong>Blinkit</strong>. Please verify your email.</p>

    <a href="${url}" 
      style="display:inline-block;padding:10px 20px;background:#0d6efd;color:#fff;
      text-decoration:none;border-radius:5px;margin-top:10px">
      Verify Email
    </a>

    <p style="margin-top:20px;font-size:14px;color:#555">
      If you did not request this, please ignore this email.
    </p>
  </div>
  `;
};
