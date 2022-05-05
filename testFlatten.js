const Lib = require('./flatten.js');
const flatten = Lib.flatten;
const { deepEqual } = require('assert').strict;

const makeTest = (desc, test) => {
  return { desc, test }
}

const runTest = ({ desc, test }) => {
  let status = '✅';
  let err;
  try {
    test(desc);
  } catch (error) {
    err = error;
    status = '❌';
  } finally {
    console.log(status, '-', desc);
    if (err) {
      console.log(err.message);
    }
  }
};

const runTests = (tests) => {
  tests.forEach(runTest);
};

const tests = [
  makeTest('Empty array', (desc) => {
    return deepEqual([], [], desc);
  }),
  makeTest('Single index nested array', (desc) => {
    return deepEqual(flatten([[1]]), [1], desc);
  }),
  makeTest('multi index nested array', (desc) => {
    return deepEqual(flatten([[[1], 2]]), [1, 2], desc);
  }),
];
runTests(tests);
