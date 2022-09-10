"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chalk = require('chalk');

var Logger = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
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
    key: "passedTests",
    value: function passedTests(message) {
      console.log(chalk.green("Result: ", message));
    }
  }, {
    key: "putOnLabel",
    value: function putOnLabel(message) {
      var prog = document.getElementsByClassName('progress');
      prog.innerHTML === "25";
      console.log(chalk.green("Result: ", message));
    }
  }]);

  return Logger;
}();

_defineProperty(Logger, "clearCompletedButtons", function (completedTodos) {
  // console.log(chalk.blue("Completed tasks: ", completedTodos));
  if (completedTodos > 0) {
    return 'Clear completed';
  } else {
    return '';
  }
});

module.exports = Logger;