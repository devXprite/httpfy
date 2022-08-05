/* eslint-disable unicorn/prefer-module */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const { default: axios } = require('axios');
const chalk = require('chalk');
const handleResponse = require('./handleResponse');
const { readFile } = require('./helper');
const httpfyConfig = require('./httpfyConfig');

const instance = axios.create({
  timeout: httpfyConfig.RequestTimeout,
  maxRedirects: httpfyConfig.maxRedirect,
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
  (resolve, _reject) => {
    instance(url, {
      beforeRedirect: (options) => {
        if (options.protocol.includes('https')) {
          console.log(`${url} ${chalk.cyanBright('-->')} ${options.href} ${chalk.magenta('[REDIRECT]')}`);
        }
      },
      method,
    })
      .then((response) => {
        handleResponse(url, response);
      })
      .catch((error) => {
        console.log(`${url} ${chalk.gray('[fail]')}`);
      }).then(() => {
        resolve();
      });
  },
);

const main = async () => {
  console.log(httpfyConfig);
  const lines = await readFile(httpfyConfig.file);
  const {
    RequestMethods, SupportedMetods, RequestPath, RequestParam,
  } = httpfyConfig;

  if (RequestMethods === 'ALL') {
    await Promise.allSettled(
      lines.map((line) => new Promise((resolve, _reject) => {
        const url = line + RequestPath + RequestParam;
        Promise.allSettled(
          SupportedMetods.map((method) => new Promise((resolveInner, _rejectInner) => {
            sendRequest(url, method).then(() => {
              resolveInner();
            });
          })),
        ).then(() => {
          resolve();
        });
      })),
    );
    return;
  }

  await Promise.allSettled(
    lines.map((line) => new Promise((resolve) => {
      const url = line + RequestPath + RequestParam;
      sendRequest(url, RequestMethods).then(() => { resolve(); });
    })),
  );
};

main();
