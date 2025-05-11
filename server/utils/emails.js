// emails/welcomeEmail.js
const sendEmail = require('./sendEmail');
const {
  getWelcomeEmailHTML,
  getResetPasswordHTML,
  getOTPEmailHTML,
} = require('./emailTemplates');

const sendWelcome = async (name, email) => {
  await sendEmail({
    to: email,
    subject: 'Welcome Aboard!',
    html: getWelcomeEmailHTML(name),
  });
};

const sendForgotPasswordEmail = async (userEmail, resetToken) => {
  await sendEmail({
    to: userEmail,
    subject: 'Reset Your Password',
    html: getResetPasswordHTML(resetToken),
  });
};

const sendOtpEmail = async (userEmail, otp) => {
  await sendEmail({
    to: userEmail,
    subject: 'Your OTP Code',
    html: getOTPEmailHTML(otp),
  });
};

module.exports = {
  sendWelcome,
  sendForgotPasswordEmail,
  sendOtpEmail,
};
