const Lib = require('./flatten.js');
const flatten = Lib.flatten;
const { deepEqual } = require('assert').strict;

const makeTest = (desc, test) => {
  return { desc, test }
}

const runTest = ({ desc, test }) => {
  let status = '✅';
  let errorMessage;
  try {
    test();
  } catch (error) {
    status = '❌';
    errorMessage = error.message;
  } finally {
    console.log(status, '-', desc);
    if (errorMessage) {
      console.log(errorMessage);
    }
  }
};

const tests = [
  makeTest('Empty array', (desc) => {
    const actual = flatten([]);
    const expected = [];
    return deepEqual(actual, expected, desc);
  }),
  makeTest('Single index nested array', (desc) => {
    return deepEqual(flatten([[1]]), [1, 2], desc);
  }),
  makeTest("multi index nested array", (desc) => {
    return deepEqual(flatten([[[1], 2]]), [1, 2], desc);
  }),
  makeTest('add 1 + 1 gives 2', () => { return deepEqual(1, 1 + 1) }),
];

const runTests = (tests) => {
  tests.forEach(runTest);
};
runTests(tests);

console.table(report);
