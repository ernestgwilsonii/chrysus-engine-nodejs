//@ts-check
/**
 * @summary Chrysus Engine Redis Subscriber
 * @param {object} params - is required like: { redisHost, redisPort, redisPass, redisChan }
 * @returns Promise<object> res - returns the results
 * */
async function redisSubscriber(params) {
  try {
    if (params) {
      // TODO: Actually validate these parameters!
      //console.log(JSON.stringify(params, null, 2));
      if (
        !params.redisHost ||
        !params.redisPort ||
        !params.redisPass ||
        !params.redisChan
      ) {
        let errMsg =
          "CRITICAL: Chrysus Engine requires parameters for Redis to work! Try passing in a valid object like: { redisHost, redisPort, redisPass, redisChan }";
        throw errMsg;
      }
    }
    // TODO: Complete the Redis implementation, this is just a future place holder!
    let res = {};
    return res;
  } catch (error) {
    console.error(error);
  }
}
module.exports.redisSubscriber = redisSubscriber;
