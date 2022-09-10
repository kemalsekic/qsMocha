"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chalk = require("chalk");

var QSLogger = /*#__PURE__*/function () {
  function QSLogger() {
    _classCallCheck(this, QSLogger);
  }

  _createClass(QSLogger, null, [{
    key: "displayDefaultMsg",
    value: function displayDefaultMsg() {
      console.log(chalk.blue("          ++++++++++++++++++++++++++++++++"));
      console.log(chalk.greenBright("                 ", this.defaultMessage));
      console.log(chalk.greenBright(""));
      console.log(chalk.greenBright("                 ", "https://qstack.tech"));
      console.log(chalk.blue("          ++++++++++++++++++++++++++++++++"));
      console.log("");
    }
  }, {
    key: "logBeginRun",
    value: function logBeginRun() {
      console.log(chalk.blue("Start:"));
    }
  }, {
    key: "logPassedTest",
    value: function logPassedTest(title) {
      console.log(chalk.green(this.indent.once, "Title: ", title));
      this.addDivider();
    }
  }, {
    key: "logFailedTest",
    value: function logFailedTest(title, errMsg) {
      console.log(chalk.redBright(this.indent.once, "FAIL: ", chalk.yellowBright(title)));
      console.log(chalk.redBright(this.indent.twice, "Error: ", chalk.red(errMsg)));
      this.addDivider();
    }
  }, {
    key: "info",
    value: function info(message) {
      console.log(chalk.blue(message));
    }
  }, {
    key: "error",
    value: function error(message) {
      console.log(chalk.red(message));
    }
  }, {
    key: "finalResult",
    value: function finalResult(message) {
      console.log(chalk.green("Result: ", message));
    }
  }, {
    key: "addDivider",
    value: function addDivider() {
      console.log(chalk.whiteBright("         --"), chalk.redBright("         --"), chalk.blueBright("         --"), chalk.yellowBright("         --"), chalk.whiteBright("         --"));
    }
  }]);

  return QSLogger;
}();

_defineProperty(QSLogger, "defaultMessage", "QStack Reporter");

_defineProperty(QSLogger, "indent", {
  once: '   ',
  twice: '      ',
  thrice: '          '
});

module.exports = QSLogger;