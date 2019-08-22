const assert = require('../chai').assert;

/**
 * This problem was recently asked by Google.
 *
 * Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
 * For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
 *
 * Bonus: Can you do this in one pass?
 */
function sum_arr(array, k) {
  if (!array) {
    return false;
  }

  const remainers = {};
  for (let i = 0; i < array.length; i++) {
    const n = array[i];
    if (remainers[n]) {
      return true;
    } else {
      const r = k - n;
      remainers[r] = true;
    }
  }

  return false;
}

assert.isTrue(sum_arr([10, 15, 3, 7], 17));
assert.isTrue(sum_arr([10, 15, 3, 7], 25));
assert.isTrue(sum_arr([10, 15, 3, 7], 10));
assert.isFalse(sum_arr([10, 15, 3, 7], 0));
assert.isFalse(sum_arr([10, 15, 3, 7], 15));
assert.isFalse(sum_arr([10, 15, 3, 7], 45));
