const nodemailer = require("nodemailer");

require('dotenv').config()

const mailTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.gmailUsername,
        pass: process.env.gmailPassword,
    }
}); 


module.exports = mailTransport