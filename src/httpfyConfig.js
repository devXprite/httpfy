/**
 * HttpFy Config Module
 * @module httpfyConfig
 */

const { sample } = require("lodash");
const { existsSync, unlinkSync } = require("node:fs");

const chalk = require("chalk");
const args = require("./args");
const userAgents = require("../db/useragents.json");

/**
 * @param {string} value
 * @returns {string} query
 */
const praseRequestParameter = (value) => `?${value.replace(/,/g, "&")}`;

/**
 * @param {string} path
 * @returns {string} path
 */
const praseRequestPath = (path) => (!path.startsWith("/") ? `/${args.requestPath}` : path);

/**
 * Check if file already Exist
 *
 * @param {string} fileDir
 * @returns {string}
 */
const checkFileExist = (fileDir) => {
    if (existsSync(fileDir)) {
        console.log(chalk.cyan(`\nFile already exists: ${chalk.magenta(args.outputFile)}`));
        console.log(chalk.cyan("File will be OverWriten\n"));
        unlinkSync(fileDir);
    }
    return fileDir;
};

/**
 * Httpfy Config Object
 *
 * @typedef {Object} httpfyConfig
 * @property {string} file
 * @property {boolean} StatusCode
 * @property {boolean} ContentLength
 * @property {boolean} ContentType
 * @property {boolean} ResponseTime
 * @property {boolean} LineCount
 * @property {boolean} WordCount
 * @property {boolean} WebServe
 * @property {boolean} Title
 * @property {boolean} Method
 * @property {boolean} Color
 * @property {boolean} Failed
 * @property {boolean} FailCode
 * @property {boolean} followRedirect
 * @property {number} Threads
 * @property {number} RequestTimeout
 * @property {number} Interval
 * @property {string} UserAgent
 * @property {string} Cookie
 * @property {string} RequestMethods
 * @property {string} RequestParam
 * @property {string} RequestPath
 * @property {(boolean|RegExp)} MatchLength
 * @property {(boolean|RegExp)} MatchCode
 * @property {(boolean|RegExp)} MatchString
 * @property {(boolean|RegExp)} MatchLineCount
 * @property {(boolean|RegExp)} FilterLength
 * @property {(boolean|RegExp)} FilterCode
 * @property {(boolean|RegExp)} FilterLineCount
 * @property {boolean} anyMatch
 * @property {boolean} anyFilter
 * @property {Array<string>} SupportedMetods
 * @property {(string|boolean)} OutputFile
 */

/**
 * @type {httpfyConfig}
 */
const httpfyConfig = {
    file: args.file,
    StatusCode: args.statusCode ?? false,
    ContentLength: args.contentLength ?? false,
    ContentType: args.contentType ?? false,
    ResponseTime: args.responseTime ?? false,
    LineCount: args.lineCount ?? false,
    WordCount: args.wordCount ?? false,
    WebServe: args.webServe ?? false,
    Title: args.title ?? false,
    Method: args.method ?? false,
    Color: (args.color) ?? true,
    Failed: args.failed ?? false,
    FailCode: args.failCode ?? false,
    RedirectLocation: args.redirectLocation ?? false,
    followRedirect: (args.redirect) ?? true,
    Threads: Number(args.threads) || 100,
    RequestTimeout: args.timeout ? args.timeout * 1000 : 30 * 60 * 1000,
    Interval: Number(args.interval) * 1000 || 0,
    UserAgent: args.userAgent || sample(userAgents),
    Cookie: args.cookie || "",
    RequestMethods: (args.requestMethods || "GET").toUpperCase(),
    RequestParam: args.requestParam ? praseRequestParameter(args.requestParam) : "",
    RequestPath: args.requestPath ? praseRequestPath(args.requestPath) : "/",
    maxRedirect: args.redirect ?? false ? Number(args.maxRedirect || 5) : 0,
    MatchLength: args.matchLength ? new RegExp(args.matchLength.split(",").map((e) => `^${e}$`).join("|")) : false,
    MatchCode: args.matchCode ? new RegExp(args.matchCode.split(",").map((e) => `^${e}$`).join("|")) : false,
    MatchString: args.matchString ? new RegExp(args.matchString.split(",").join("|")) : false,
    MatchLineCount: args.matchLineCount ? new RegExp(args.matchLineCount.split(",").map((e) => `^${e}$`).join("|")) : false,
    FilterLength: args.filterLength ? new RegExp(args.filterLength.split(",").map((e) => `^${e}$`).join("|")) : false,
    FilterCode: args.filterCode ? new RegExp(args.filterCode.split(",").map((e) => `^${e}$`).join("|")) : false,
    FilterLineCount: args.filterLineCount ? new RegExp(args.filterLineCount.split(",").map((e) => `^${e}$`).join("|")) : false,
    anyMatch: Boolean(args.matchCode || args.matchLength || args.matchLineCount || args.matchString),
    anyFilter: Boolean(args.filterCode || args.filterLength || args.filterLineCount),
    SupportedMetods: ["GET", "DELETE", "HEAD", "OPTIONS", "POST", "PUT", "PATCH"],
    OutputFile: args.outputFile ? checkFileExist(args.outputFile) : false,
};

// console.log(httpfyConfig);

module.exports = httpfyConfig;
