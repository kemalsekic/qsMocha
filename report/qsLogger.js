const chalk = require("chalk");

class QSLogger {
  static defaultMessage = "QStack Reporter";
  static indent = {
    once: '   ',
    twice: '      ',
    thrice: '          ',
  };

  static displayDefaultMsg() {
    console.log(chalk.blue("          ++++++++++++++++++++++++++++++++"));
    console.log(chalk.greenBright("                 ", this.defaultMessage));
    console.log(chalk.greenBright(""));
    console.log(chalk.greenBright("                 ", "https://qstack.tech"));
    console.log(chalk.blue("          ++++++++++++++++++++++++++++++++"));
    console.log("");
  }

  static logBeginRun() {
    console.log(chalk.blue("Start:"));
  }

  static logBeginRun() {
    console.log(chalk.blue("Start:"));
  }

  static logPassedTest(title) {
    console.log(chalk.green(this.indent.once, "Title: ", title));
    this.addDivider();
  }

  static logFailedTest(title, errMsg) {
    console.log(chalk.redBright(this.indent.once, "FAIL: ", chalk.yellowBright(title)));
    console.log(chalk.redBright(this.indent.twice, "Error: ", chalk.red(errMsg)));
    this.addDivider();
  }

  static info(message) {
    console.log(chalk.blue(message));
  }

  static error(message) {
    console.log(chalk.red(message));
  }

  static finalResult(message) {
    console.log(chalk.green("Result: ", message));
  }

  static addDivider() {
    console.log(
      chalk.whiteBright("         --"),
      chalk.redBright("         --"),
      chalk.blueBright("         --"),
      chalk.yellowBright("         --"),
      chalk.whiteBright("         --")
    );
  }
}

module.exports = QSLogger;
