/* eslint-disable no-unused-vars */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const { default: axios } = require('axios');
const Bluebird = require('bluebird');
const chalk = require('chalk');
const handleResponse = require('./handleResponse');
const { readFile } = require('./helper');
const httpfyConfig = require('./httpfyConfig');

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
} = httpfyConfig;

const instance = axios.create({
  timeout: RequestTimeout,
  maxRedirects: maxRedirect,
  validateStatus: (status) => status >= 0 && status <= 1000,
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

const sendRequest = (url, method) => new Promise(
  (resolve) => {
    instance(url, {
      beforeRedirect: (options) => {
        if (followRedirect && options.protocol.includes('http')) {
          console.log(`${url} ${chalk.cyanBright('-->')} ${options.href} ${chalk.magenta('[REDIRECT]')}`);
        }
      },
      method,
    })
      .then((response) => {
        handleResponse(url, response);
      })
      .catch((error) => {
        if (Failed || FailCode) {
          const FailedCode = (FailCode) ? (error.code ? `[${error.code}]` : '') : '';
          console.log(`${url} ${chalk.gray('[fail]')} ${chalk.gray(FailedCode)}`);
        }
      }).then((_) => setTimeout(resolve, Interval));
  },
);

const main = async () => {
  console.log(httpfyConfig);
  const lines = await readFile(file);

  if (RequestMethods === 'ALL') {
    await Bluebird.map(lines, (line) => new Promise((resolve) => {
      const url = line + RequestPath + RequestParam;

      Bluebird.map(SupportedMetods, (method) => new Promise((resolveInner) => {
        sendRequest(url, method).then((_) => resolveInner());
      }), { concurrency: Threads }).then((_) => resolve());
    }), { concurrency: Threads });

    return;
  }

  await Bluebird.map(lines, (line) => new Promise((resolve) => {
    const url = line + RequestPath + RequestParam;
    sendRequest(url, RequestMethods).then(() => { resolve(); });
  }), { concurrency: Threads });

  console.log('Done');
};

module.exports = main;
