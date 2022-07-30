const btcService = require('./btcService');
const nodemailer = require("nodemailer");
require('dotenv').config();

const getEmails = function(done) {
    btcService.getEmails(done);
}

const addEmail = function(email, done) {
    btcService.addEmail(email, done);
}

const sendEmail = function(email, result) {
    const username = process.env.USERNAME
    const password = process.env.PASSWORD

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password,
        },
    });

    const mailOptions = {
        from: `"BTC to UAH sender" <${username}>`,
        to: email.email,
        subject: "BTC to UAH",
        text: `Base: BTC \nCurrent price: ${result.data.amount} UAH \nDate: ${new Date()}`,
        dsn : {
            notify: ['failure', 'delay'],
            recipient: email.email
        }
    };
    return transporter.sendMail(mailOptions)
}

module.exports = {
    getEmails,
    addEmail,
    sendEmail
}