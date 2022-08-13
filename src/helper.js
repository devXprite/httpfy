/**
 * Helper Functions
 * @module helper
 */

/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-nested-ternary */
const fs = require("node:fs");
const chalk = require("chalk");
const process = require("node:process");
const cliProgress = require("cli-progress");

const throwError = (message) => {
    console.log(chalk.redBright(message));
    process.exit(0);
};

/**
 * A Function that Return Urls Array from file
 *
 * @param {string} filePath File Path
 * @returns {Promise<string[]>} URLs Array
 */
const readFile = (filePath) => new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            throwError(error);
            reject(error);
            return;
        }
        /** @type {Array} */
        const fileLines = data.toString().replace(/\r\n/g, "\n").split("\n");
        resolve(fileLines.map((line) => (line.startsWith("http") ? line : `https://${line}`)));
    });
});

/**
 * Check if terminal supports Unicode
 * https://github.com/sindresorhus/is-unicode-supported/blob/main/index.js
 *
 * @return {boolean}
 */
const isUnicodeSupported = () => {
    if (process.platform !== "win32") {
        return process.env.TERM !== "linux";
    }

    return (
        Boolean(process.env.CI)
        || Boolean(process.env.WT_SESSION)
        || process.env.ConEmuTask === "{cmd::Cmder}"
        || process.env.TERM_PROGRAM === "vscode"
        || process.env.TERM === "xterm-256color"
        || process.env.TERM === "alacritty"
        || process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm"
    );
};

/**
 * Main Symbols
 * @type {object}
 */
const mainSymbols = {
    info: chalk.bold.blue("ℹ"),
    success: chalk.bold.green("✔"),
    warning: chalk.yellow("⚠"),
    error: chalk.bold.red("✖"),
};

/**
 * fallbacks for Windows CMD
 * @type {object}
 */
const fallbackSymbols = {
    info: chalk.bold.blue("i"),
    success: chalk.bold.green("√"),
    warning: chalk.yellow("‼"),
    error: chalk.bold.red("x"),
};

const logSymbols = isUnicodeSupported() ? mainSymbols : fallbackSymbols;

/**
 * Initialize a multiprogress container.
 * @instance
 */
const multiBar = new cliProgress.MultiBar(
    {
        format: `{percentage}% |${"{bar}"}| {value}/{total} Requests | ETA: {eta_formatted}`,
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        stopOnComplete: true,
        hideCursor: true,
        clearOnComplete: true,
        barsize: 40,
        forceRedraw: true,
        barGlue: "",
    },
    cliProgress.Presets.shades_classic,
);

/**
 * Create a new progress bar
 */
const progresBar = multiBar.create();

/**
 * log value over Progress Bar
 * @param {string} msg
 * @returns {void}
 */
const print = (msg) => {
    multiBar.log(`${msg}\n`);
};

module.exports = {
    readFile,
    throwError,
    print,
    progresBar,
    logSymbols,
};
