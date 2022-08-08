/* eslint-disable unicorn/prevent-abbreviations */
const { sample } = require('lodash');

const opt = require('./options');
const userAgents = require('../db/useragents.json');

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
  RequestTimeout: (opt.timeout) ? (opt.timeout * 1000) : 30 * 60 * 1000,
  followRedirect: (opt.followRedirect) ?? false,
  Interval: Number(opt.interval) * 1000 || 0,
  UserAgent: (opt.userAgent) || sample(userAgents),
  Cookie: (opt.cookie) || '',
  RequestMethods: (opt.requestMethods || 'GET').toUpperCase(),
  RequestParam: (opt.requestParam) ? praseRequestParameter(opt.requestParam) : '',
  RequestPath: (opt.requestPath) ? praseRequestPath(opt.requestPath) : '/',
  maxRedirect: ((opt.followRedirect) ?? false) ? Number(opt.maxRedirect || 10) : 0,
  MatchLength: opt.MatchLength ? new RegExp((opt.MatchLength.split(',')).map((i) => `^${i}$`).join('|')) : false,
  MatchCode: (opt.MatchCode) ? new RegExp((opt.MatchCode.split(',')).map((i) => `^${i}$`).join('|')) : false,
  MatchString: (opt.MatchString) ? new RegExp((opt.MatchString.split(',')).join('|')) : false,
  MatchLineCount: opt.MatchLineCount ? new RegExp((opt.MatchLineCount.split(',')).map((i) => `^${i}$`).join('|')) : false,
  FilterLength: opt.FilterLength ? new RegExp((opt.FilterLength.split(',')).map((i) => `^${i}$`).join('|')) : false,
  FilterCode: (opt.FilterCode) ? new RegExp((opt.FilterCode.split(',')).map((i) => `^${i}$`).join('|')) : false,
  FilterLineCount: opt.FilterLineCount ? new RegExp((opt.FilterLineCount.split(',')).map((i) => `^${i}$`).join('|')) : false,
  anyMatch: Boolean(opt.MatchCode || opt.MatchLength || opt.MatchLineCount || opt.MatchString),
  anyFilter: Boolean(opt.FilterCode || opt.FilterLength || opt.FilterLineCount),
  SupportedMetods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

module.exports = httpfyConfig;
