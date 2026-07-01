export const forgotPasswordTemplate = (name, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
  </head>

  <body style="
      margin:0;
      padding:0;
      background:#f5f7fb;
      font-family:Arial, Helvetica, sans-serif;
  ">

      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
              <td align="center">

                  <table width="600" cellpadding="0" cellspacing="0"
                      style="
                          background:#ffffff;
                          border-radius:12px;
                          overflow:hidden;
                          box-shadow:0 5px 25px rgba(0,0,0,.08);
                      ">

                      <!-- Header -->
                      <tr>
                          <td
                              style="
                                  background:#16a34a;
                                  color:#ffffff;
                                  text-align:center;
                                  padding:30px;
                              "
                          >
                              <h1 style="margin:0;font-size:30px;">
                                  Blinkit
                              </h1>

                              <p style="margin-top:8px;font-size:15px;">
                                  Password Reset Verification
                              </p>
                          </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                          <td style="padding:40px;">

                              <h2 style="margin-top:0;color:#222;">
                                  Hello ${name},
                              </h2>

                              <p style="
                                  color:#555;
                                  font-size:16px;
                                  line-height:1.8;
                              ">
                                  We received a request to reset your
                                  Blinkit account password.
                              </p>

                              <p style="
                                  color:#555;
                                  font-size:16px;
                                  line-height:1.8;
                              ">
                                  Use the One-Time Password (OTP) below to
                                  complete the password reset process.
                              </p>

                              <!-- OTP Box -->
                              <div
                                  style="
                                      margin:35px 0;
                                      text-align:center;
                                  "
                              >
                                  <span
                                      style="
                                          display:inline-block;
                                          background:#f0fff4;
                                          color:#16a34a;
                                          border:2px dashed #16a34a;
                                          border-radius:10px;
                                          padding:18px 45px;
                                          font-size:34px;
                                          font-weight:bold;
                                          letter-spacing:8px;
                                      "
                                  >
                                      ${otp}
                                  </span>
                              </div>

                              <p style="
                                  color:#555;
                                  font-size:15px;
                                  line-height:1.8;
                              ">
                                  This OTP will expire in
                                  <strong>1 hour</strong>.
                                  Do not share this code with anyone.
                              </p>

                              <p style="
                                  color:#555;
                                  font-size:15px;
                                  line-height:1.8;
                              ">
                                  If you didn't request a password reset,
                                  you can safely ignore this email.
                                  Your account remains secure.
                              </p>

                          </td>
                      </tr>

                      <!-- Security Notice -->
                      <tr>
                          <td
                              style="
                                  background:#fff7ed;
                                  padding:22px 40px;
                                  border-top:1px solid #f3f4f6;
                              "
                          >
                              <strong style="color:#d97706;">
                                  Security Tip
                              </strong>

                              <p style="
                                  margin:8px 0 0;
                                  color:#666;
                                  font-size:14px;
                                  line-height:1.7;
                              ">
                                  Blinkit will never ask for your password,
                                  OTP, or banking information over email,
                                  phone, or SMS.
                              </p>
                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td
                              style="
                                  text-align:center;
                                  padding:30px;
                                  background:#f8fafc;
                                  color:#777;
                                  font-size:13px;
                              "
                          >
                              <p style="margin:0;">
                                  Thanks,
                              </p>

                              <p style="
                                  margin:8px 0;
                                  font-weight:bold;
                                  color:#16a34a;
                              ">
                                  Blinkit Team
                              </p>

                              <p style="
                                  margin-top:18px;
                                  font-size:12px;
                                  color:#999;
                              ">
                                  © ${new Date().getFullYear()} Blinkit.
                                  All rights reserved.
                              </p>
                          </td>
                      </tr>

                  </table>

              </td>
          </tr>
      </table>

  </body>
  </html>
  `;
};