const options = require('./options');

const praseRequestParameter = (string) => `?${string.replace(/,/g, '&')}`;

const praseRequestPath = (path) => (!path.startsWith('/') ? `/${options.requestPath}` : path);

const httpfyConfig = {
  file: options.file,
  StatusCode: options.StatusCode ?? true,
  ContentLength: options.ContentLength ?? false,
  ContentType: options.ContentType ?? false,
  ResponseTime: options.ResponseTime ?? false,
  LineCount: options.LineCount ?? false,
  WordCount: options.WordCount ?? false,
  WebServe: options.WebServe ?? false,
  Title: options.Title ?? false,
  Failed: options.Failed ?? false,
  FailCode: options.FailCode ?? false,
  Threads: Number(options.threads) || 100,
  Interval: Number(options.interval) * 1000 || 0,
  MatchLength: options.MatchLength ? new RegExp(options.MatchLength.replace(/,/g, '|')) : false,
  MatchCode: (options.MatchCode) ? new RegExp(options.MatchCode.replace(/,/g, '|')) : false,
  MatchLineCount: options.MatchLineCount ? new RegExp(options.MatchLineCount.replace(/,/g, '|')) : false,
  anyMatchProbe: Boolean(options.MatchCode || options.MatchLength || options.MatchLineCount),
  RequestMethods: (options.requestMethods || 'GET').toUpperCase(),
  RequestParam: (options.requestParam) ? praseRequestParameter(options.requestParam) : '',
  RequestPath: (options.requestPath) ? praseRequestPath(options.requestPath) : '/',
  RequestTimeout: (options.timeout) ? (options.timeout * 1000) : 30 * 60 * 1000,
  followRedirect: (options.followRedirect) ?? false,
  maxRedirect: ((options.followRedirect) ?? false) ? Number(options.maxRedirect || 10) : 0,
  SupportedMetods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

module.exports = httpfyConfig;
