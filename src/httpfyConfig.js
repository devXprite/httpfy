const { sample } = require("lodash");

const opt = require("./options");
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
const praseRequestPath = (path) => (!path.startsWith("/") ? `/${opt.requestPath}` : path);

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
 */

/**
 * @type {httpfyConfig}
 */
const httpfyConfig = {
    file: opt.file,
    StatusCode: opt.statusCode ?? false,
    ContentLength: opt.contentLength ?? false,
    ContentType: opt.contentType ?? false,
    ResponseTime: opt.responseTime ?? false,
    LineCount: opt.lineCount ?? false,
    WordCount: opt.wordCount ?? false,
    WebServe: opt.webServe ?? false,
    Title: opt.title ?? false,
    Method: opt.method ?? false,
    Color: (opt.color) ?? true,
    Failed: opt.failed ?? false,
    FailCode: opt.failCode ?? false,
    RedirectLocation: opt.redirectLocation ?? false,
    followRedirect: (opt.redirect) ?? true,
    Threads: Number(opt.threads) || 100,
    RequestTimeout: opt.timeout ? opt.timeout * 1000 : 30 * 60 * 1000,
    Interval: Number(opt.interval) * 1000 || 0,
    UserAgent: opt.userAgent || sample(userAgents),
    Cookie: opt.cookie || "",
    RequestMethods: (opt.requestMethods || "GET").toUpperCase(),
    RequestParam: opt.requestParam ? praseRequestParameter(opt.requestParam) : "",
    RequestPath: opt.requestPath ? praseRequestPath(opt.requestPath) : "/",
    maxRedirect: opt.redirect ?? false ? Number(opt.maxRedirect || 5) : 0,
    MatchLength: opt.matchLength ? new RegExp(opt.matchLength.split(",").map((e) => `^${e}$`).join("|")) : false,
    MatchCode: opt.matchCode ? new RegExp(opt.matchCode.split(",").map((e) => `^${e}$`).join("|")) : false,
    MatchString: opt.matchString ? new RegExp(opt.matchString.split(",").join("|")) : false,
    MatchLineCount: opt.matchLineCount ? new RegExp(opt.matchLineCount.split(",").map((e) => `^${e}$`).join("|")) : false,
    FilterLength: opt.filterLength ? new RegExp(opt.filterLength.split(",").map((e) => `^${e}$`).join("|")) : false,
    FilterCode: opt.filterCode ? new RegExp(opt.filterCode.split(",").map((e) => `^${e}$`).join("|")) : false,
    FilterLineCount: opt.filterLineCount ? new RegExp(opt.filterLineCount.split(",").map((e) => `^${e}$`).join("|")) : false,
    anyMatch: Boolean(opt.matchCode || opt.matchLength || opt.matchLineCount || opt.matchString),
    anyFilter: Boolean(opt.filterCode || opt.filterLength || opt.filterLineCount),
    SupportedMetods: ["GET", "DELETE", "HEAD", "OPTIONS", "POST", "PUT", "PATCH"],
};

console.log(httpfyConfig);

module.exports = httpfyConfig;
