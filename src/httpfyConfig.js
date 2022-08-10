const { sample } = require('lodash');

const opt = require('./options');
const userAgents = require('../db/useragents.json');

/**
 * @param {string} value
 * @returns {string} query
 */
const praseRequestParameter = (value) => `?${value.replace(/,/g, '&')}`;

/**
 * @param {string} path
 * @returns {string} path
 */
const praseRequestPath = (path) => (!path.startsWith('/') ? `/${opt.requestPath}` : path);

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
  StatusCode: opt.StatusCode ?? false,
  ContentLength: opt.ContentLength ?? false,
  ContentType: opt.ContentType ?? false,
  ResponseTime: opt.ResponseTime ?? false,
  LineCount: opt.LineCount ?? false,
  WordCount: opt.WordCount ?? false,
  WebServe: opt.WebServe ?? false,
  Title: opt.Title ?? false,
  Method: opt.Method ?? false,
  Failed: opt.Failed ?? false,
  FailCode: opt.FailCode ?? false,
  Threads: Number(opt.threads) || 100,
  RequestTimeout: (opt.timeout) ? (opt.timeout * 1000) : 30 * 60 * 1000,
  followRedirect: (opt.followRedirect) ?? false,
  Interval: Number(opt.interval) * 1000 || 0,
  UserAgent: (opt.userAgent) || sample(userAgents),
  Cookie: (opt.cookie) || '',
  RequestMethods: (opt.requestMethods || 'GET').toUpperCase(),
  RequestParam: (opt.requestParam) ? praseRequestParameter(opt.requestParam) : '',
  RequestPath: (opt.requestPath) ? praseRequestPath(opt.requestPath) : '/',
  maxRedirect: ((opt.followRedirect) ?? false) ? Number(opt.maxRedirect || 10) : 0,
  MatchLength: opt.MatchLength ? new RegExp((opt.MatchLength.split(',')).map((e) => `^${e}$`).join('|')) : false,
  MatchCode: (opt.MatchCode) ? new RegExp((opt.MatchCode.split(',')).map((e) => `^${e}$`).join('|')) : false,
  MatchString: (opt.MatchString) ? new RegExp((opt.MatchString.split(',')).join('|')) : false,
  MatchLineCount: opt.MatchLineCount ? new RegExp((opt.MatchLineCount.split(',')).map((e) => `^${e}$`).join('|')) : false,
  FilterLength: opt.FilterLength ? new RegExp((opt.FilterLength.split(',')).map((e) => `^${e}$`).join('|')) : false,
  FilterCode: (opt.FilterCode) ? new RegExp((opt.FilterCode.split(',')).map((e) => `^${e}$`).join('|')) : false,
  FilterLineCount: opt.FilterLineCount ? new RegExp((opt.FilterLineCount.split(',')).map((e) => `^${e}$`).join('|')) : false,
  anyMatch: Boolean(opt.MatchCode || opt.MatchLength || opt.MatchLineCount || opt.MatchString),
  anyFilter: Boolean(opt.FilterCode || opt.FilterLength || opt.FilterLineCount),
  SupportedMetods: ['GET', 'DELETE', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
};

module.exports = httpfyConfig;
