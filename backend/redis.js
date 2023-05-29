const { createClient } = require("redis");

const redisClient = createClient();
redisClient.connect().catch(err=>{
  console.log("Error was in connection")
  console.log(err)
});

module.exports = redisClient;
