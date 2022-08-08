/* eslint-disable unicorn/explicit-length-check */
/* eslint-disable no-unused-vars */
const chalk = require('chalk');
const httpfyConfig = require('./httpfyConfig');

const isMatch = require('./match');

const getTitle = (response) => {
  const regEx = /<title[^>]*>(.*?)<\/title>/gim;
  const match = regEx.exec(response.data);
  return (match?.[1]) ? `[${match[1]}]` : '[untitled]';
};

// eslint-disable-next-line consistent-return
const statusColor = (status) => {
  if (/2\d\d/gm.test(status)) return chalk.greenBright(`[${status}]`);
  if (/3\d\d/gm.test(status)) return chalk.yellowBright(`[${status}]`);
  if (/4\d\d/gm.test(status)) return chalk.magentaBright(`[${status}]`);
  if (/5\d\d/gm.test(status)) return chalk.redBright(`[${status}]`);
};

const getContentLength = (response) => (response.headers['content-length']) || (response.data).toString().length;
const getContentType = (response) => (response.headers['content-type']).split(/;/)[0] || 'text/html';
const getResponseTime = (response) => (`${(response.headers['request-duration']) / 1000 || 0}s`);
const getWebServer = (response) => (response.headers['x-powered-by']);

const handleResponse = (urlx, response) => {
  const { status, config, data } = response;
  const { url } = config;

  const title = httpfyConfig.Title ? getTitle(response) : '\b';
  const contentLength = httpfyConfig.ContentLength ? getContentLength(response) : '\b';
  const contentType = httpfyConfig.ContentType ? getContentType(response) : '\b';
  const responseTime = httpfyConfig.ResponseTime ? getResponseTime(response) : '\b';
  const server = httpfyConfig.WebServe ? getResponseTime(response) : '\b';

  const printResult = () => {
    console.log(
      url,
      statusColor(status),
      chalk.cyan(title),
      chalk.magenta(contentLength),
      chalk.yellow(responseTime),
      chalk.cyan(contentType),
    );
  };

  if (isMatch(status, contentLength, data)) {
    printResult();
  }
};

module.exports = handleResponse;
