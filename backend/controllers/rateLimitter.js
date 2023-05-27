const redisClient = require("../redis");

module.exports.rateLimitter = async (req, res, next) => {
  const ip = req.connection.remoteAddress.slice(0, 4);
  const response = await redisClient.multi().incr(ip).expire(ip, 60).exec();
  if (response[1] > 10) {
    res.json({
      loggedIn: false,
      status: "Sala nee yaru da spam panra",
    });
  } else next();
};
