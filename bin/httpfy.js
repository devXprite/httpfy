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
    /** @type {Array<string>} */
    const lines = await readFile(file);

    /**
     * Filter blank & invalid lines
     * @type {Array<string>}
     */
    let domains = lines.filter((line) => line.includes("."));

    domains = domains.flatMap((domain) => RequestProtocol.map((protocol) => `${protocol}://${domain}`));

    // console.log(URLs);
    progresBar.start(RequestMethods === "ALL" ? domains.length * SupportedMetods.length : domains.length);

    if (RequestMethods === "ALL") {
        await Bluebird.map(
            domains,
            (domain) => new Promise((resolve) => {
                const url = domain + RequestPath + RequestParam;

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
        domains,
        (domain) => new Promise((resolve) => {
            const url = domain + RequestPath + RequestParam;
            sendRequest(url, RequestMethods).then(() => {
                resolve();
                progresBar.increment();
            });
        }),
        { concurrency: Threads },
    ).then(() => {
        progresBar.stop();
    });

    print("Done");
};

main();
