const chalk = require("chalk");
const Mocha = require('mocha');
const fs = require("fs");
var Base = require('mocha/lib/reporters/base');
var path = require('path');
const createUnsupportedError = require('mocha/lib/errors').createUnsupportedError;
const utils = require('mocha/lib/utils');
var constants = require('mocha/lib/runner').constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_TEST_END = constants.EVENT_TEST_END;
var EVENT_RUN_END = constants.EVENT_RUN_END;
const npm = require("npm");

npm.load(() => npm.run("mocha --reporter report/qsJSONReporter.js"));

exports = module.exports = QSRJReporter;

function QSRJReporter(runner, options = {}) {
  Base.call(this, runner, options);

  var self = this;
  var tests = [];
  var pending = [];
  var failures = [];
  var passes = [];
  var output;

  if (options.reporterOption && options.reporterOption.output) {
    if (utils.isBrowser()) {
      throw createUnsupportedError('file output not supported in browser');
    }
    output = options.reporterOption.output;
  }

  runner.on(EVENT_TEST_END, function (test) {
    tests.push(test);
  });

  runner.on(EVENT_TEST_PASS, function (test) {
    passes.push(test);
  });

  runner.on(EVENT_TEST_FAIL, function (test) {
    failures.push(test);
  });

  runner.on(EVENT_TEST_PENDING, function (test) {
    pending.push(test);
  });

  runner.once(EVENT_RUN_END, function () {
    var obj = {
      stats: self.stats,
      tests: tests.map(clean),
      pending: pending.map(clean),
      failures: failures.map(clean),
      passes: passes.map(clean)
    };

    runner.testResults = obj;

    var json = JSON.stringify(obj, null, 2);
    fs.writeFileSync('report/qstackReport.json', JSON.stringify(obj.passes, null, 2), function(err) {
      if (err) 
          return console.error(err); 
      console.log('Saved!');
  });
    if (output) {
      try {
        fs.mkdirSync(path.dirname(output), {recursive: true});
        fs.writeFileSync(output, json);
      } catch (err) {
        console.error(
          `${Base.symbols.err} [mocha] writing output to "${output}" failed: ${err.message}\n`
        );
        process.stdout.write(json);
      }
    } else {
      process.stdout.write(json);
    }
  });
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @private
 * @param {Object} test
 * @return {Object}
 */
function clean(test) {
  var err = test.err || {};
  if (err instanceof Error) {
    err = errorJSON(err);
  }

  return {
    title: test.title,
    fullTitle: test.fullTitle(),
    file: test.file,
    duration: test.duration,
    currentRetry: test.currentRetry(),
    speed: test.speed,
    err: cleanCycles(err)
  };
}

/**
 * Replaces any circular references inside `obj` with '[object Object]'
 *
 * @private
 * @param {Object} obj
 * @return {Object}
 */
function cleanCycles(obj) {
  var cache = [];
  return JSON.parse(
    JSON.stringify(obj, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Instead of going in a circle, we'll print [object Object]
          return '' + value;
        }
        cache.push(value);
      }

      return value;
    })
  );
}

/**
 * Transform an Error object into a JSON object.
 *
 * @private
 * @param {Error} err
 * @return {Object}
 */
function errorJSON(err) {
  var res = {};
  Object.getOwnPropertyNames(err).forEach(function (key) {
    res[key] = err[key];
  }, err);
  return res;
}

QSRJReporter.description = 'single JSON object';



// class QSRJSON {
// //   myData = fs.readFileSync('report/testResults.json');
// //   infoData = JSON.parse(this.myData);
// testData = {"testName":"First Test", "duration":30, "testResult":"Pass"};

//   static addToJSON(){    
//     console.log(chalk.green("Title: ", this.myData));
//     var jsonData = JSON.stringify(this.infoData)
//     console.log('tRzlts.json', jsonData);
//   }
  
// //   static finished(){
// //     if(false){
// //         console.error(error);
// //         return;
// //     }
// //   }

//   static writeToJSON(){
//     var jsonData = JSON.stringify(this.testData, null, 2);
    
//     fs.readFile('report/testResults.json', function (err, jsonData) {
//     fs.writeFile('report/testResults.json', jsonData, function(err, result) {
//         console.log('error', err);
//         console.log('error', result);
//         console.log('error', jsonData);
//         console.log('error', this.testData.testName);
//         if(err) console.log('error', err);
//         })})
//     }
// }

// module.exports = QSRJSON;
