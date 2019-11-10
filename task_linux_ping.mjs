/**
 * @summary Blah
 * @param {string} target - is required and
 * @returns {object} res - returns the
 * */
export async function task(target) {
  try {
    if (target) {
      let res = "Target responded to ping: " + target;
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}
