/* eslint-disable no-unused-vars */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const { default: axios } = require('axios');
const Bluebird = require('bluebird');
const chalk = require('chalk');
const handleResponse = require('./handleResponse');
const { readFile } = require('./helper');
const httpfyConfig = require('./httpfyConfig');
const {progresBar,print} = require("../src/progressBar")


const {
  RequestTimeout,
  maxRedirect,
  Failed,
  FailCode,
  RequestMethods,
  SupportedMetods,
  RequestPath,
  RequestParam,
  Threads, file,
  Interval,
  followRedirect,
  UserAgent,
  RedirectLocation,
  Cookie,
} = httpfyConfig;


/**
 * Create Axios instance
 */
const instance = axios.create({
  timeout: RequestTimeout,
  maxRedirects: maxRedirect,
  validateStatus: (status) => status >= 0 && status <= 1000,
  headers: {
    'User-Agent': UserAgent,
    Cookie,
  },
});

instance.interceptors.request.use((config) => {
  config.headers['request-startTime'] = process.hrtime();
  return config;
});

instance.interceptors.response.use((response) => {
  const start = response.config.headers['request-startTime'];
  const end = process.hrtime(start);
  const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1_000_000));
  response.headers['request-duration'] = milliseconds;
  return response;
});

/**
 * Send Axios Request
 * @async
 * @param {string} url Target URL
 * @param {string} method Request Method
 * @returns {Promise} Promise
 */
const sendRequest = async (url, method) => new Promise(
  (resolve) => {
    instance(url, {
      beforeRedirect: (options) => {
        if (RedirectLocation && options.protocol.includes('http')) {
          print(`${chalk.blueBright('ℹ')} ${url} ${chalk.cyanBright('-->')} ${options.href}`);
        }
      },
      method,
    })
      .then((response) => {
        handleResponse(response);
      })
      .catch((error) => {
        if (Failed || FailCode) {
          const FailedCode = (FailCode) ? (error.code ? `[${error.code}]` : '') : '';
          print(`${chalk.yellow('⚠')} ${chalk.gray(url)} ${chalk.gray(FailedCode)}`);
        }
      }).then((_) => {
        setTimeout(resolve, Interval)
      });
  },
);

/**
 * Main Function
 * @async
 * @returns {void}
 */
const main = async () => {
  /** @type {Array<string>} */
  const lines = await readFile(file);

  progresBar.start( (RequestMethods === 'ALL') ? lines.length * httpfyConfig.RequestMethods.length: lines.length)

  if (RequestMethods === 'ALL') {
    await Bluebird.map(lines, (line) => new Promise((resolve) => {
      const url = line + RequestPath + RequestParam;

      Bluebird.map(SupportedMetods, (method) => new Promise((resolveInner) => {
        sendRequest(url, method).then((_) => {resolveInner();progresBar.increment()});
      }), { concurrency: Threads }).then((_) => resolve());
    }), { concurrency: Threads }).then((_) => {
    progresBar.stop()
  })
    return;
  }

  await Bluebird.map(lines, (line) => new Promise((resolve) => {
    const url = line + RequestPath + RequestParam;
    sendRequest(url, RequestMethods).then(() => { resolve();progresBar.increment() });
  }), { concurrency: Threads }).then((_) => {
    progresBar.stop()
  });

  print('Done');
};

module.exports = main;
