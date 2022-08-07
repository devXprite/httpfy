/* eslint-disable unicorn/prevent-abbreviations */
const opt = require('./options');

const praseRequestParameter = (string) => `?${string.replace(/,/g, '&')}`;

const praseRequestPath = (path) => (!path.startsWith('/') ? `/${opt.requestPath}` : path);

const httpfyConfig = {
  file: opt.file,
  StatusCode: opt.StatusCode ?? true,
  ContentLength: opt.ContentLength ?? false,
  ContentType: opt.ContentType ?? false,
  ResponseTime: opt.ResponseTime ?? false,
  LineCount: opt.LineCount ?? false,
  WordCount: opt.WordCount ?? false,
  WebServe: opt.WebServe ?? false,
  Title: opt.Title ?? false,
  Failed: opt.Failed ?? false,
  FailCode: opt.FailCode ?? false,
  Threads: Number(opt.threads) || 100,
  Interval: Number(opt.interval) * 1000 || 0,
  MatchLength: opt.MatchLength ? new RegExp((opt.MatchLength.split(',')).map((i) => `^${i}$`).join('|')) : false,
  MatchCode: (opt.MatchCode) ? new RegExp((opt.MatchCode.split(',')).map((i) => `^${i}$`).join('|')) : false,
  MatchLineCount: opt.MatchLineCount ? new RegExp((opt.MatchLineCount.split(',')).map((i) => `^${i}$`).join('|')) : false,
  anyMatch: Boolean(opt.MatchCode || opt.MatchLength || opt.MatchLineCount),
  RequestMethods: (opt.requestMethods || 'GET').toUpperCase(),
  RequestParam: (opt.requestParam) ? praseRequestParameter(opt.requestParam) : '',
  RequestPath: (opt.requestPath) ? praseRequestPath(opt.requestPath) : '/',
  RequestTimeout: (opt.timeout) ? (opt.timeout * 1000) : 30 * 60 * 1000,
  followRedirect: (opt.followRedirect) ?? false,
  maxRedirect: ((opt.followRedirect) ?? false) ? Number(opt.maxRedirect || 10) : 0,
  SupportedMetods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

console.log(typeof (httpfyConfig.MatchCode));
console.log(httpfyConfig.MatchCode);

module.exports = httpfyConfig;
