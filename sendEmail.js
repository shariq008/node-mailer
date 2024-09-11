const express = require('express');
const cors = require('cors');

// sendEmail.js
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: 'rajashariq008@gmail.com',
    pass: 'hadg vvft styi vtop '
  }
});

// Function to render EJS template and send email
async function sendEmail(to, subject, templateName, context) {
  // Define the path to the EJS template file
  const templatePath = path.join(__dirname, 'views/emails', `${templateName}.ejs`);

  // Read and compile the EJS template
  const templateString = fs.readFileSync(templatePath, 'utf-8');
  const html = ejs.render(templateString, context);

  // Define email options
  const mailOptions = {
    from: 'rajashariq008@gmail.com',
    to: to,
    subject: subject,
    html: html
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Example usage
sendEmail('recipient@example.com', 'Welcome to Our Service', 'welcome', { name: 'John Doe' });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
