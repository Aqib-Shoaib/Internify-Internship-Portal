// emails/welcomeEmail.js
const sendEmail = require('./sendEmail');
const {
  getWelcomeEmailHTML,
  getResetPasswordHTML,
  getOTPEmailHTML,
  contactEmailTOUser,
  contactEmailToAdmin,
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

const sendContactEmailTOUser = async (formName, formEmail) => {
  await sendEmail({
    to: formEmail,
    subject: 'Your Contact Form Message was recieved',
    html: contactEmailTOUser(formName),
  });
};

const sendContactEmailToAdmin = async (
  formName,
  formEmail,
  formSubject,
  formMesage,
) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: 'Contact Form on Internify was submitted',
    html: contactEmailToAdmin(formName, formEmail, formSubject, formMesage),
  });
};

module.exports = {
  sendWelcome,
  sendForgotPasswordEmail,
  sendOtpEmail,
  sendContactEmailTOUser,
  sendContactEmailToAdmin,
};
