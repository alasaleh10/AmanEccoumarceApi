const nodemailer = require('nodemailer');

const sendEmail = async (email, text, subject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '3maxgamer@gmail.com',
            pass: process.env.GOOGLE_PASS
        }
    });

    const mailOptions = {
        from: '3maxgamer@gmail.com',
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
