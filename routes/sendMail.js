const sendMail = require("./../services/send")
module.exports = function (app) {
    app.get('/post', function(req, res) {
        let content = req.query.c
        let emailaddr = req.query.e
        
        sendMail(content, emailaddr)

        res.send("OK")

    })
}