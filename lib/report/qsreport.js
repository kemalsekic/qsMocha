// QSReport.js
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Mocha = require('mocha');

var QSLogger = require('../report/qsLogger');

var _Mocha$Runner$constan = Mocha.Runner.constants,
    EVENT_RUN_BEGIN = _Mocha$Runner$constan.EVENT_RUN_BEGIN,
    EVENT_RUN_END = _Mocha$Runner$constan.EVENT_RUN_END,
    EVENT_TEST_FAIL = _Mocha$Runner$constan.EVENT_TEST_FAIL,
    EVENT_TEST_PASS = _Mocha$Runner$constan.EVENT_TEST_PASS,
    EVENT_SUITE_BEGIN = _Mocha$Runner$constan.EVENT_SUITE_BEGIN,
    EVENT_SUITE_END = _Mocha$Runner$constan.EVENT_SUITE_END; // this reporter outputs test results, indenting two spaces per suite

var QSReport = /*#__PURE__*/function () {
  function QSReport(runner) {
    var _this = this;

    _classCallCheck(this, QSReport);

    this._indents = 0;
    var stats = runner.stats;
    runner.once(EVENT_RUN_BEGIN, function () {
      QSLogger.displayDefaultMsg();
      QSLogger.logBeginRun();
    }).on(EVENT_SUITE_BEGIN, function () {
      _this.increaseIndent();
    }).on(EVENT_SUITE_END, function () {
      _this.decreaseIndent();
    }).on(EVENT_TEST_PASS, function (test) {
      // console.log(`${this.indent()}pass: ${test.fullTitle()}`);
      QSLogger.logPassedTest(test.fullTitle());
    }).on(EVENT_TEST_FAIL, function (test, err) {
      QSLogger.logFailedTest(test.fullTitle(), err.message); // console.log(
      //   `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
      // );
    }).once(EVENT_RUN_END, function () {
      QSLogger.finalResult("".concat(stats.passes, "/").concat(stats.passes + stats.failures, " ok")); // console.log(`end:`);
    });
  }

  _createClass(QSReport, [{
    key: "indent",
    value: function indent() {
      return Array(this._indents).join('  ');
    }
  }, {
    key: "increaseIndent",
    value: function increaseIndent() {
      this._indents++;
    }
  }, {
    key: "decreaseIndent",
    value: function decreaseIndent() {
      this._indents--;
    }
  }]);

  return QSReport;
}();

module.exports = QSReport;