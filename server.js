const express = require('express');
const mailgun = require('mailgun-js');
const app = express();

app.use(express.json());

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    
    // Send email using Mailgun
    await mg.messages().send({
      from: 'Audiology Plus <onboarding@audiologyplus.com>',
      to: formData.email,
      subject: 'Welcome to Audiology Plus - Your Onboarding Information',
      text: `Thank you for completing the Audiology Plus onboarding process...`
      // Add attachments here if needed
    });

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));