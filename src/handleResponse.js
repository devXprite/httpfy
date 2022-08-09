/**
 * Handle Axios Response
 * @module handleResponse
 */

const chalk = require('chalk');
const httpfyConfig = require('./httpfyConfig');
const isMatch = require('./match');

/**
 * A Function to return website title from response data
 * @param {string} data Axios Response Data
 * @returns {string} title
 */
const getTitle = (data) => {
  const regEx = /<title[^>]*>(.*?)<\/title>/gim;
  const match = regEx.exec(data);
  return (match?.[1]) ? `[${match[1]}]` : '[untitled]';
};

/**
 * A Function to return Colored Status
 *
 * @param {Number} status Response Status Code
 * @return {string} Return colored status
 */
const statusColor = (status) => {
  if (/2\d\d/gm.test(status)) return chalk.greenBright(`[${status}]`);
  if (/3\d\d/gm.test(status)) return chalk.yellowBright(`[${status}]`);
  if (/4\d\d/gm.test(status)) return chalk.magentaBright(`[${status}]`);
  if (/5\d\d/gm.test(status)) return chalk.redBright(`[${status}]`);
};

/**
 * A function to return Content Length from
 *
 * @param {string} response Axios Response
 * @returns {Number} Content Length
 */
const getContentLength = (response) => (response.headers['content-length']) || (response.data).toString().length;

/**
 * A function to return Content Type
 *
 * @param {string} response Axios Response
 * @returns {string} content-type
 */
const getContentType = (response) => (response.headers['content-type']).split(/;/)[0] || 'text/html';

/**
 * A function to return Response Time
 *
 * @param {string} response Axios Response
 * @returns {string} Response Time
 */
const getResponseTime = (response) => (`${(response.headers['request-duration']) / 1000 || 0}s`);

/**
 * A function to return Web Server
 *
 * @param {string} response Axios Response
 * @returns {string} Web Server
 */
const getWebServer = (response) => (response.headers['x-powered-by']);

/**
 * A function to handle Axios response
 *
 * @param {string} response Axios Response
 * @returns {void}
 */
const handleResponse = (response) => {
  const { status, config, data } = response;

  /** @type {string} */
  const { url } = config;

  /** @type {string} */
  const title = httpfyConfig.Title ? getTitle(response) : '\b';

  /** @type {number|string} */
  const contentLength = httpfyConfig.ContentLength ? getContentLength(response) : '\b';

  /** @type {string} */
  const contentType = httpfyConfig.ContentType ? getContentType(response) : '\b';

  /** @type {number|string} */
  const responseTime = httpfyConfig.ResponseTime ? getResponseTime(response) : '\b';

  /** @type {string} */
  const server = httpfyConfig.WebServe ? getWebServer(response) : '\b';

  /**
   * A function to print result on console
   * @returns {void}
   */
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
