import mailgun from 'mailgun-js';
import PDFDocument from 'pdfkit';

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const generatePDF = (formData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Add form data to PDF
    doc.fontSize(16).text('Onboarding Form Entries', {align: 'center'});
    doc.moveDown();
    Object.entries(formData).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${value}`);
      doc.moveDown();
    });

    doc.end();
  });
};

const generateTermsAndConditionsPDF = () => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(16).text('Terms and Conditions', {align: 'center'});
    doc.moveDown();
    doc.fontSize(12).text('Your terms and conditions text goes here...');

    doc.end();
  });
};

export const sendEmail = async (formData) => {
  const formEntriesPDF = await generatePDF(formData);
  const termsAndConditionsPDF = await generateTermsAndConditionsPDF();

  const data = {
    from: 'Audiology Plus <onboarding@audiologyplus.com>',
    to: formData.email,
    subject: 'Welcome to Audiology Plus - Your Onboarding Information',
    text: `Dear ${formData.name},

Thank you for completing the Audiology Plus onboarding process. We're excited to have you join our family!

Attached to this email, you'll find two important documents:
1. A summary of the information you provided during the onboarding process.
2. Our terms and conditions document.

Please review these documents and keep them for your records. If you have any questions or need to make any changes, please don't hesitate to contact us.

We look forward to working with you and helping your practice thrive.

Best regards,
The Audiology Plus Team`,
    attachment: [
      {data: formEntriesPDF, filename: 'onboarding_summary.pdf'},
      {data: termsAndConditionsPDF, filename: 'terms_and_conditions.pdf'}
    ]
  };

  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};