const Lib = require('./flatten.js');
const flatten = Lib.flatten;
const { deepEqual } = require('assert').strict;

const makeTest = (msg, test) => {
  return { msg, test }
}

const runTest = ({ msg, test }) => {
  let status = '✅';
  let err;
  try {
    test(msg);
  } catch (error) {
    err = {
      actual: error.actual,
      expected: error.expected,
      message: error.message,
    };
    status = '❌';
  } finally {
    console.log(status, '-', msg);
    if (err) {
      console.log(err);
    }
  }
};

const runTests = (tests) => {
  tests.forEach(runTest);
};

const tests = [
  makeTest('Empty array', () => {
    return deepEqual([], [], 'Empty array');
  }),
  makeTest('Single index nested array', (message) => {
    return deepEqual(flatten([[1]]), [1], message);
  }),
  makeTest('multi index nested array', (message) => {
    return deepEqual(flatten([[[1], 2]]), [1], message);
  }),
];
runTests(tests);
