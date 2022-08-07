// Template.prototype.clearCompletedButtons = function (completedTodos) {
//     console.log("Completed to dos: ", completedTodos);
//     if (completedTodos > 0) {
//         return 'Clear completed';
//     } else {
//         return '';
//     }
// };
// import chalk from 'chalk';
const chalk = require('chalk');
console.log(chalk.blue("message"));

class Logger {
    static passes = 0;

    static defaultMessage = "Hello World";
  
    static info(message) {
      console.log(chalk.blue(message));
    }
  
    static error(message) {
      console.log(chalk.red(message));
    }

    static passedTests(message) {
        console.log(chalk.green("Result: ", message));
    }

    static putOnLabel(message) {
        var prog = document.getElementsByClassName('progress');
        prog.innerHTML === "25";
        console.log(chalk.green("Result: ", message));
    }

    static clearCompletedButtons = function (completedTodos) {
        console.log(chalk.blue("Completed to dos: ", completedTodos));
        if (completedTodos > 0) {
            return 'Clear completed';
        } else {
            return '';
        }
    };
  }
  
  module.exports = Logger;

// const qsReport = require('report/qsreport.js');

// console.log(qsReport.stats);