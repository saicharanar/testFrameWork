const Lib = require('./flatten.js');
const flatten = Lib.flatten;
const { deepEqual } = require('assert').strict;

const makeTest = (message, test) => {
  return { message, test }
}

const runTest = ({ message, test }) => {
  let passed = true;
  let err;
  try {
    test(message);
  } catch (error) {
    err = error;
    passed = false;
  } finally {
    if (err) {
      return { passed, ...err, stack: err.stack, message: err.message };
    }
    return {
      passed, message
    }
  }
};

const runTests = (tests) => {
  return tests.map(runTest);
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
const testData = runTests(tests);

// reporter
const printPassed = function (testCase) {
  console.log('✅', '-', testCase.message);
};

const printFailed = function (testCase) {
  console.log('❌', '-', testCase.message);
  console.log({ actual: testCase.actual, expected: testCase.expected });
};

const separateTests = function (testData) {
  const isPassed = (x) => x.passed;
  const isFailed = (x) => !x.passed;

  return [testData.filter(isPassed), testData.filter(isFailed)];
};

const reportGenerator = function (testData) {
  const [passed, failed] = separateTests(testData);

  passed.forEach(printPassed);
  console.log();
  failed.forEach(printFailed);

  console.log('\nreport:');
  return {
    totalCases: testData.length,
    passedCases: passed.length,
    failedCases: failed.length,
  };
};

console.log(reportGenerator(testData));
exports.testData = testData;
