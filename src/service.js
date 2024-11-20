const knex = require('./dbConnection.js');
const transporter = require('./nodemailer.js');
const moment = require('moment');

const date = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Jakarta',
});

exports.storeDownload = async (body) => {
  try {
    const {type, ...bodyRes} = body
    const result = await knex('download-log').insert(bodyRes);
    const date_time = moment();
    transporter.sendMail({
        from: 'webadmin@imaniprima.com',
        to: process.env.NODE_ENV === 'production' ? 'sales_support@imaniprima.co.id' : 'sidna.zen@imaniprima.com',
        subject: 'Download Log WebIP - '+ date_time.format('DD-MM-YYYY'),
        text: `
          Name: ${body.name}
          Email: ${body.email}
          Phone: ${body.phone}
          Position: ${body.position}
          Company: ${body.company}
          City: ${body.city}
          Company Field: ${body.company_field}
          Downloaded File Type: ${type}
          Selected Product: ${body.selected_product}

          Date: ${date_time.format('DD-MM-YYYY HH:mm:ss')}
        `,
      });

    return result;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

exports.storeSales = async (body) => {
  try {
    const result = await knex('contact-sales').insert(body);

    transporter.sendMail({
      from: 'webadmin@imaniprima.com',
      to:
        process.env.NODE_ENV === 'production'
          ? 'sales_support@imaniprima.co.id'
          : 'sidna.zen@imaniprima.com',
      subject: body.subject,
      text: `
          Name: ${body.name}
          Email: ${body.email}
          Subject: ${body.subject}
          Message: ${body.message}

          Date: ${date}
        `,
    });

    return result;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

exports.storeCareer = async (body) => {
  try {
    const result = await knex('contact-career').insert(body);
    transporter.sendMail({
      from: 'webadmin@imaniprima.com',
      to:
        process.env.NODE_ENV === 'production'
          ? 'hr@imaniprima.com'
          : 'sidna.zen@imaniprima.com',
      subject: `Career Imani Prima - ${body.position} - ${body.name}`,
      text: `
          Name: ${body.name}
          Email: ${body.email}
          Position: ${body.position}
          Cover Letter: ${body.cover_letter}

          Date: ${date}
        `,
    });
    return result;
  } catch (error) {
    // console.log(error);
    return error;
  }
};