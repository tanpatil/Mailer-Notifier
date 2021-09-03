const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')
const os = require('os')
const Logger = require("./../config/logger")
require('dotenv').config()
module.exports = {
    loader: async function(app) {
        /*
        * Main Loader to Load all our express modules into memory
        * Returns a promise, which resolves the express app variable
        * */
        return new Promise(function(resolve, reject) {

            // start the server
            app.listen(process.env.PORT, process.env.IP, (req, res) => {
                Logger.info("Server Started")
            })

            // user parser to parse into json
            app.use(bodyParser.urlencoded({extended: true}));

            // as we are behind NGINX
            app.enable('trust proxy');

            // cors
            app.use(cors());

            // route and access logging
            const accessLogStream = rfs.createStream('access_log.log', {
                interval: '1d', // rotate daily
                path: path.join(__dirname, '../logs')
            });

            // log access to the server.
            app.use(morgan('dev', { stream: accessLogStream }))

            // require all the routes used by the app
            require("./../routes/index")(app);


            // a 404 route to help the users understand where they're messing up!.
            app.use(function(req, res, next) {
                res.status(404).json({
                    'message':`Invalid Route. You are using the PeerAdmit API from host ${os.hostname()} and ${os.platform()}`
                })
            })

            // once everthing is initialized, return the app to the promise!
            resolve(app)
        })
    }
}