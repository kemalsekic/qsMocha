// QSReport.js

'use strict';
    
const Mocha = require('mocha');
var QSLogger = require('../report/qsLogger');
var QSRJSON = require('./qsJSONReporter');

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
    var self = this;
    var tests = [];
    var pending = [];
    var failures = [];
    var passes = [];
    var output;

    Base.call(this, runner, options);
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
        QSLogger.logPassedTest(test.fullTitle());
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        QSLogger.logFailedTest(test.fullTitle(), err.message);
        QSRJSON.writeToJSON();
      })
      .once(EVENT_RUN_END, () => {
        QSLogger.finalResult(`${stats.passes}/${stats.passes + stats.failures} ok`);
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