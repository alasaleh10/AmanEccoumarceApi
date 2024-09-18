const nodemailer = require('nodemailer');

const sendEmail = async (email, text, subject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ala2020saleh@gmail.com',
            pass: process.env.GOOGLE_PASS
        }
    });

    const mailOptions = {
        from: 'ala2020saleh@gmail.com',
        to: email,
        subject: subject,
        // text: text,
        html: text
    };

    try {
         await transporter.sendMail(mailOptions);
    } catch (error) {
       
        throw error; 
    }
};

module.exports = sendEmail;
