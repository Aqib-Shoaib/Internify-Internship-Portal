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
