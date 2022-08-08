/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-nested-ternary */
const fs = require('node:fs');
const chalk = require('chalk');

const throwError = (message) => {
  console.log(chalk.redBright(message));
  process.exit(0);
};

/**
 * A Function that Return Urls Array from file
 *
 * @param {string} filePath File Path
 * @returns {Promise<Array>} URLs Array
 */
const readFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      throwError(error);
      reject(error);
      return;
    }
    /** @type {Array} */
    const fileLines = data.toString().replace(/\r\n/g, '\n').split('\n');
    resolve(fileLines.map((line) => (line.startsWith('http') ? line : `https://${line}`)));
  });
});

module.exports = {
  readFile, throwError,
};
