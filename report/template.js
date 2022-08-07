const chalk = require('chalk');

class Logger {  
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
        // console.log(chalk.blue("Completed tasks: ", completedTodos));
        if (completedTodos > 0) {
            return 'Clear completed';
        } else {
            return '';
        }
    };
  }
  
  module.exports = Logger;