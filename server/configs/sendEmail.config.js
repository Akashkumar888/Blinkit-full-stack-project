import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.log("❌ Please provide RESEND_API_KEY in .env file");
  process.exit(1);
}

export const sendEmail = async({sendTo,subject,html})=>{
  try {
    const { data, error } = await resend.emails.send({
    from: "Blinkit <no-reply@blinkit.com>", // ✅ better than onboarding@resend.dev
    to: sendTo,
    subject: subject,
    html: html,
  });
   if (error) {
      console.error("❌ Email send error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("❌ Resend error:", err);
    return null;
  }
};