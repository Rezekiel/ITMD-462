const moment = require("moment");

// middleware
// Everytime a request is made, the middleware is ran
const logger = (req, res, next) => {
  // responds witht the user url request plus time stamp using moment (third party package)
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`
  );
  next();
};

module.exports = logger;
