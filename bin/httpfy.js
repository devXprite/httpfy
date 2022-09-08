#!/usr/bin/env node

/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable no-param-reassign */
const { default: axios } = require("axios");
const Bluebird = require("bluebird");
const chalk = require("chalk");
const handleResponse = require("../lib/handleResponse");
const httpfyConfig = require("../lib/httpfyConfig");
const {
    readFile, progresBar, print, logSymbols,
} = require("../lib/helper");

const {
    RequestTimeout,
    maxRedirect,
    Failed,
    RequestMethods,
    SupportedMetods,
    RequestPath,
    RequestParam,
    Threads,
    file,
    Interval,
    UserAgent,
    RedirectLocation,
    Cookie,
    Color,
    RequestProtocol,
    Headers,
} = httpfyConfig;

/**
 * Create Axios instance
 */
const instance = axios.create({
    timeout: RequestTimeout,
    maxRedirects: maxRedirect,
    validateStatus: (status) => status >= 0 && status <= 1000,
    headers: {
        "User-Agent": UserAgent,
        Cookie,
    },
});

instance.interceptors.request.use((config) => {
    if (Headers) {
        config.headers[Headers[0]] = Headers[1];
    }
    config.headers["request-startTime"] = process.hrtime();
    return config;
});

instance.interceptors.response.use((response) => {
    const start = response.config.headers["request-startTime"];
    const end = process.hrtime(start);
    const milliseconds = Math.round(end[0] * 1000 + end[1] / 1000000);
    response.headers["request-duration"] = milliseconds;
    return response;
});

/**
 * Send Axios Request
 * @async
 * @param {string} url Target URL
 * @param {string} method Request Method
 * @returns {Promise} Promise
 */
const sendRequest = async (url, method) => new Promise((resolve) => {
    instance(url, {
        beforeRedirect: (options) => {
            if (RedirectLocation && options.protocol.includes("http")) {
                print(`${logSymbols.info} ${url} ${chalk.cyanBright("-->")} ${options.href}`);
            }
        },
        method,
    })
        .then((response) => {
            handleResponse(response);
        })
        .catch((error) => {
            if (Failed) {
                const FailedCode = error.code ? `[${error.code}]` : "";
                if (Color) {
                    print(`${logSymbols.warning} ${chalk.gray(url)} ${chalk.gray(FailedCode)}`);
                } else {
                    print(`! ${url} ${FailedCode}`);
                }
            }
        })
        .then(() => {
            setTimeout(resolve, Interval);
        });
});

/**
 * Main Function
 * @async
 * @returns {void}
 */
const main = async () => {
    /** @type {Array<Number>} */
    const startTime = process.hrtime();

    /** @type {Array<string>} */
    const lines = await readFile(file);

    /**
     * Filter blank & invalid lines
     * @type {Array<string>}
     */
    const hostNames = lines.filter((line) => line.includes("."));

    let URLs = hostNames.flatMap((host) => RequestProtocol.map((protocol) => `${protocol}://${host}`));
    URLs = URLs.flatMap((domain) => RequestPath.map((path) => `${domain}/${path}`));
    URLs = URLs.map((domain) => domain + RequestParam);

    progresBar.start(RequestMethods === "ALL" ? URLs.length * SupportedMetods.length : URLs.length);

    if (RequestMethods === "ALL") {
        await Bluebird.map(
            URLs,
            (url) => new Promise((resolve) => {
                Bluebird.map(
                    SupportedMetods,
                    (method) => new Promise((resolveInner) => {
                        sendRequest(url, method).then(() => {
                            resolveInner();
                            progresBar.increment();
                        });
                    }),
                    { concurrency: Threads },
                ).then(() => {
                    resolve();
                });
            }),
            { concurrency: Threads },
        ).then(() => {
            progresBar.stop();
        });
        return;
    }

    await Bluebird.map(
        URLs,
        (url) => new Promise((resolve) => {
            sendRequest(url, RequestMethods).then(() => {
                resolve();
                progresBar.increment();
            });
        }),
        { concurrency: Threads },
    ).then(() => {
        progresBar.stop();
    });

    const endTime = process.hrtime(startTime);

    print(`\n\nScanned total ${chalk.bold(`${URLs.length}URLs`)} in ${chalk.bold(`${endTime[0]}seconds`)}.`);
};

main();
