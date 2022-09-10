// var results = require("../report/qsreport");
// const Mocha = require('mocha');

// var Runner = Mocha.Runner;
// var Suite = Mocha.Suite;

// QSReport.js

'use strict';
    
const Mocha = require('mocha');
var QSLogger = require('../report/qsLogger');

const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Mocha.Runner.constants;

// this reporter outputs test results, indenting two spaces per suite
class QSReport {
  constructor(runner) {
    this._indents = 0;
    const stats = runner.stats;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        QSLogger.displayDefaultMsg();
        QSLogger.logBeginRun();
      })
      .on(EVENT_SUITE_BEGIN, () => {
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, () => {
        this.decreaseIndent();
      })
      .on(EVENT_TEST_PASS, test => {
        // console.log(`${this.indent()}pass: ${test.fullTitle()}`);
        QSLogger.logPassedTest(test.fullTitle());
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        QSLogger.logFailedTest(test.fullTitle(), err.message);
        // console.log(
        //   `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
        // );
      })
      .once(EVENT_RUN_END, () => {
        QSLogger.finalResult(`${stats.passes}/${stats.passes + stats.failures} ok`);
        // console.log(`end:`);
      });
  }

  indent() {
    return Array(this._indents).join('  ');
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}


module.exports = QSReport;