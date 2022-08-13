#!/usr/bin/env node

/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable max-len */
const { Command } = require("commander");
const pkg = require("../package.json");

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version, "-v, --version", "output the current version");

program.requiredOption("-f, --file <path>", "Input file containing list of URLs");

program
    .option("-sc, --status-code", "display response status-code")
    .option("-cl, --content-length", "display response content-length")
    .option("-ct, --content-type", "display response content-type")
    .option("-rt, --response-time", "display response time")
    .option("-lc, --line-count", "display response body line count")
    .option("-wc, --word-count", "display response body word count")
    .option("-ws, --web-serve", "display web server name")
    .option("-rl, --redirect-location", "display redirect location")
    .option("-m, --method", "display http request method")
    .option("-nc, --no-color", "disable colors in cli output")
    .option("-ttl, --title", "display page title")
    .option("-fl, --failed", "display failed request's");

program
    .option("-nr, --no-redirect", "don't follow redirects")
    .option("-mr, --max-redirect <number>", "maximum redirects to follow")
    .option("-t, --threads <number>", "maximum cocurrent requests send", 100)
    .option("-i, --interval <number>", "interval between each thread")
    .option("-c, --cookie <string>", "send cookies")
    .option("-x, --request-methods <string>", "set request methods, use 'all' to probe all HTTP methods")
    .option("-path, --request-path <string>", "set request path")
    .option("-param, --request-param <string>", "set request parameters")
    .option("-ua, --user-agent <string>", "set custom useragent")
    .option("-time, --timeout <number>", "set request timeout in seconds");

program
    .option("-mc, --match-code <string>", "match response with specified status code (-mc 200,302)")
    .option("-ml, --match-length <string>", "match response with specified content length (-ml 100,102)")
    .option("-mlc, --match-line-count <string> ", "match response body with specified line count (-mlc 423,532)")
    .option("-ms, --match-string <string> ", "match response with specified strings");

program
    .option("-o , --output-file <string>", "save results in a single file")
    .option("-of, --output-folder <string>", "save results in multiple files accoring status code");

program.parse();

console.log(program.opts());

module.exports = program.opts();
