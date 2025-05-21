const {
  sendContactEmailToAdmin,
  sendContactEmailTOUser,
} = require('../utils/emails');

exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: 'Name, email, and message are required.' });
    }

    await sendContactEmailToAdmin(name, email, subject, message);

    await sendContactEmailTOUser(name, email);

    res.status(200).json({ message: 'Messages sent successfully!' });
  } catch (err) {
    console.error('Contact form error:', err);
    res
      .status(500)
      .json({ error: 'Something went wrong. Please try again later.' });
  }
};
