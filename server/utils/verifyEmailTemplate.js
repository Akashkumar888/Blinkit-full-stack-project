/**
 * ==========================================================
 * Verify Email Template
 * ==========================================================
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.url
 * @returns {string}
 * ==========================================================
 */

export const verifyEmailTemplate = ({ name, url }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f5f7fb;
        font-family:Arial, Helvetica, sans-serif;
    "
>

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table
    width="600"
    cellpadding="0"
    cellspacing="0"
    style="
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 6px 25px rgba(0,0,0,.08);
    "
>

<!-- Header -->
<tr>
<td
    style="
        background:#16a34a;
        color:#ffffff;
        text-align:center;
        padding:35px;
    "
>
    <h1 style="margin:0;font-size:30px;">
        Blinkit
    </h1>

    <p style="margin-top:10px;font-size:15px;">
        Verify Your Email Address
    </p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#222;">
Hello ${name},
</h2>

<p
    style="
        font-size:16px;
        color:#555;
        line-height:1.8;
    "
>
Thank you for creating your Blinkit account.
</p>

<p
    style="
        font-size:16px;
        color:#555;
        line-height:1.8;
    "
>
To activate your account and start shopping, please verify
your email address by clicking the button below.
</p>

<div style="text-align:center;margin:40px 0;">

<a
    href="${url}"
    target="_blank"
    rel="noopener noreferrer"
    style="
        display:inline-block;
        background:#16a34a;
        color:#ffffff;
        text-decoration:none;
        padding:16px 38px;
        border-radius:8px;
        font-size:16px;
        font-weight:bold;
    "
>
Verify Email
</a>

</div>

<p
    style="
        font-size:15px;
        color:#555;
        line-height:1.8;
    "
>
If the button above doesn't work, copy and paste the
following link into your browser:
</p>

<p
    style="
        word-break:break-word;
        font-size:14px;
        color:#2563eb;
    "
>
${url}
</p>

<p
    style="
        margin-top:25px;
        font-size:15px;
        color:#555;
        line-height:1.8;
    "
>
If you did not create a Blinkit account, you can safely ignore
this email. No further action is required.
</p>

</td>
</tr>

<!-- Security Notice -->
<tr>
<td
    style="
        background:#fff7ed;
        padding:24px 40px;
        border-top:1px solid #eeeeee;
    "
>

<strong style="color:#d97706;">
Security Notice
</strong>

<p
    style="
        margin:10px 0 0;
        color:#666;
        font-size:14px;
        line-height:1.7;
    "
>
Never share your password or OTP with anyone.
Blinkit will never ask for your password via email,
SMS, or phone call.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td
    style="
        background:#f8fafc;
        text-align:center;
        padding:30px;
        color:#777;
        font-size:13px;
    "
>

<p style="margin:0;">
Thank you for choosing
<strong style="color:#16a34a;">Blinkit</strong>.
</p>

<p style="margin:12px 0;">
Best Regards,<br>
<strong>Blinkit Team</strong>
</p>

<p
    style="
        margin-top:18px;
        color:#999;
        font-size:12px;
    "
>
© ${new Date().getFullYear()} Blinkit. All Rights Reserved.
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