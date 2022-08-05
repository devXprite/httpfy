/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable max-len */
const { Command } = require('commander');
const pkg = require('../package.json');

const program = new Command();

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version, '-v, --version', 'output the current version');

program
  .requiredOption('-f, --file <path>', 'Input file containing list of URLs');

program
  .option('-sc, -status-code', 'display response status-code', true)
  .option('-cl, -content-length', 'display response content-length')
  .option('-ct, -content-type', 'display response content-type')
  .option('-rt, -response-time', 'display response time')
  .option('-lc, -line-count', 'display response body line count')
  .option('-wc, -word-count', 'display response body word count')
  .option('-server, -web-serve', 'display web server name')
  .option('-ttl, -title', 'display page title');

program
  .option('-fr, --follow-redirect', 'is follow redirects', true)
  .option('-mr, --max-redirect <number>', 'maximum redirects to follow')
  .option('-path, --request-path <string>', 'set request path (-path admin)')
  .option('-x, --request-methods <string>', 'set request methods, use \'all\' to probe all HTTP methods (-x POST)')
  .option('-param, --request-param <string>', 'set request parameters (-param id=1)')
  .option('-time, --timeout <number>', 'set request timeout in seconds (-time 60)');

program
  .option('-mc, -match-code <string>', 'match response with specified status code (-mc 200,302)')
  .option('-ml, -match-length <string>', 'match response with specified content length (-ml 100,102)')
  .option('-mlc, -match-line-count <string> ', 'match response body with specified line count (-mlc 423,532)');

program.option('-o , --output-file <path>', 'save results in a single file')
  .option('-of, --output-folder <path>', 'save results multiple files accoring to status code');

program.parse();
// const options = program.opts();
// console.log(options);
console.log(program.opts());

module.exports = program.opts();
