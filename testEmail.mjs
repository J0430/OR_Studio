import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Not loaded"
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // ✅ true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"OR Studio" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: "✅ Test Email from OR Studio",
  text: "🎉 If you're reading this, your Gmail SMTP config works!",
};

transporter
  .sendMail(mailOptions)
  .then((info) => {
    console.log("✅ Email sent:", info.response);
  })
  .catch((err) => {
    console.error("❌ Error sending email:", err);
  });
