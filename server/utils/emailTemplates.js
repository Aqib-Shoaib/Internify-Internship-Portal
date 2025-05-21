exports.getWelcomeEmailHTML = (name) => `
  <div style="font-family: sans-serif; color: #333;">
    <h2>Welcome to Our Platform, ${name}!</h2>
    <p>We're excited to have you join. Let us know if you need anything.</p>
  </div>
`;

exports.getOTPEmailHTML = (otp) => `
  <div style="font-family: sans-serif;">
    <h2>Your Verification Code</h2>
    <p>Please use this one-time code:</p>
    <h3 style="color: #007bff; letter-spacing: 3px;">${otp}</h3>
    <p>This code will expire in 5 minutes.</p>
  </div>
`;

exports.getResetPasswordHTML = (resetToken) => `
  <div style="font-family: sans-serif;">
    <h2>Reset Your Password</h2>
    <p>Copy and paste follwing token to reset your password:</p>
    <span style="display:inline-block;padding:10px 15px;color:#000;border-radius:5px;text-decoration:underline;">
     ${resetToken}
    </span>
    <p>This Token will expire within 10 minutes</p>
    <p>If you didn’t request this, you can ignore this email.</p>
  </div>
`;

exports.contactEmailTOUser = (name) => `
  <div>
    <p>Hi ${name},</p>
    <p>Thanks for contacting us! We’ve received your message and will get back to you shortly.</p>
    <p>If your message was urgent, feel free to reply to this email.</p>
    <br>
    <p>Best regards,</p>
    <p>The Team</p>
  </div>
`;

exports.contactEmailToAdmin = (name, email, subject, message) => `
  <div>
    <h2>New Contact Message Received</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
    <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    <hr />
    <p>This message was submitted via your website contact form.</p>
  </div>
`;
