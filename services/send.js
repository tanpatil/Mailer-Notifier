const mailTransport = require("./../config/nodemailer")
const Logger = require("./../config/logger")

module.exports = async function(content, email) {
    mailOptions = {
        from: process.env.gmailUsername,
        to: email,
        subject: "NOTIFICATION",
        text: content
    }
    mailTransport.sendMail(mailOptions, function(error, info) {
        if(error) {
            Logger.error(error)
        }
        else {
            Logger.info(`Sent reset password mail to ${email} with code ${code}. ${info}`)
        }
    })
}