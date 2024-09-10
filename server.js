const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = 3000;

app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { 'your-name': name, 'your-email': email, 'your-phone': phone, 'your-peoples': peoples, 'date-956': tourDate, 'your-subject': subject, 'your-message': message } = req.body;

  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'Dubaidesertsafaritours1@gmail.com', 
      pass: 'gmld dfcl imtp gzmm',   
    },
  });

  
  const mailOptions = {
    from: email,  
    to: 'Dubaidesertsafaritours1@gmail.com',  
    subject: subject || 'New Contact Us Form Submission',
    text: `You have a new message from ${name}.
    
    Email: ${email}
    Phone: ${phone}
    Number of People: ${peoples}
    Date of Tour: ${tourDate}
    
    Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: 'Failed to send email.' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send({ success: true, message: 'Email sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

