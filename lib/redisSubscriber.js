/**
 * @summary Chrysus Engine Redis Subscriber
 * @param {object} params - is required like: { redisHost, redisPort, redisPass, redisChan }
 * @returns {object} res - {}
 * */
async function redisSubscriber(params) {
  try {
    if (params) {
      console.log(JSON.stringify(params, null, 2));
    }
    // TODO: Complete the Redis implementation, this is just a future place holder!
  } catch (error) {
    console.error(error);
  }
}
module.exports.redisSubscriber = redisSubscriber;
