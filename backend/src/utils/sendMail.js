const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: smtpUsername,
      pass: smtpPassword,
    },
  });

  const mailOptions = {
    from: smtpUsername,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
