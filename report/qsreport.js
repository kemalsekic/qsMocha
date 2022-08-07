// QSReport.js

'use strict';
var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');
    
// const Mocha = require('mocha');
var Logger = require('../report/template');
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Mocha.Runner.constants;

var totalPassed = 0;

// this reporter outputs test results, indenting two spaces per suite
class QSReport {
  constructor(runner) {
    this._indents = 0;
    const stats = runner.stats;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        console.log('start');
      })
      .on(EVENT_SUITE_BEGIN, () => {
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, () => {
        this.decreaseIndent();
      })
      .on(EVENT_TEST_PASS, test => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        console.log(`${this.indent()}pass: ${test.fullTitle()}`);
        // this.showResults(stats);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(
          `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
        );
      })
      .once(EVENT_RUN_END, () => {
        // this.showResults();
        Logger.passedTests(`${stats.passes}/${stats.passes + stats.failures} ok`);
        console.log(`end:`);
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

  showResults(statistics) {
    console.log("Passes: ", statistics.passes);
    this.totalPassed = statistics.passes;
    this.printPasses();
  }

  printPasses() {
    console.log("Now here are the results: ", this.totalPassed);
}
}


module.exports = QSReport;