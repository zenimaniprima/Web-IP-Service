const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'ssl://smtp.googlemail.com',
  port: 465,
  secure: true,
  service: 'Gmail',
  auth: {
    user: 'webadmin@imaniprima.com',
    pass: 'ImaniWebadmin@23',
  },
});

module.exports = transporter;
