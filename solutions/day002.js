const expect = require('../chai').expect;

/**
 This problem was asked by Uber.

 Given an array of integers, return a new array such that each element at index i of the new array
 is the product of all the numbers in the original array except the one at i.
 For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24].
 If our input was [3, 2, 1], the expected output would be [2, 3, 6].

 Follow-up: what if you can't use division?
 */
function with_div(inputArr) {
  if (!Array.isArray(inputArr)) {
    throw new Error('Expected input to be an array');
  }

  const masterProduct = inputArr.reduce((p, n) => p * n, 1);

  return inputArr.map(n => masterProduct / n);
}

expect(with_div([1, 2, 3, 4, 5])).to.eql([120, 60, 40, 30, 24]);
expect(with_div([3, 2, 1])).to.eql([2, 3, 6]);


function without_div(inputArr) {
  if (!Array.isArray(inputArr)) {
    throw new Error('Expected input to be an array');
  }

  // element at index i is the product of all the numbers in the original array before this index
  const products_from_start = [];
  // element at index i is the product of all the numbers in the original array after this index
  const products_from_end = [];


  for (let i = 0; i < inputArr.length; i++) {
    if (i === 0) {
      products_from_start.push(1);
      products_from_end.push(1);
    } else {
      const lastStart = products_from_start[i - 1];
      products_from_start.push(lastStart * inputArr[i - 1]);

      const lastEnd = products_from_end[0];
      products_from_end.unshift(lastEnd * inputArr[inputArr.length - i]);
    }
  }

  const result = [];
  for (let i = 0; i < inputArr.length; i++) {
    result[i] = products_from_start[i] * products_from_end[i];
  }

  return result;
}

expect(without_div([1, 2, 3, 4, 5])).to.eql([120, 60, 40, 30, 24]);
expect(without_div([3, 2, 1])).to.eql([2, 3, 6]);
