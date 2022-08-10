const chalk = require('chalk');
const cliProgress = require('cli-progress');

const multiBar = new cliProgress.MultiBar({
  format: `Requests Send |${chalk.cyan('{bar}')}| {percentage}% | {value}/{total} Requests | ETA: {eta_formatted}`,
  // barCompleteChar: '\u2588',
  // barIncompleteChar: '\u2591',
  stopOnComplete: true,
  hideCursor: true,
  clearOnComplete:true,
  barsize : 50,
  forceRedraw:true,
  barGlue : ''
}, cliProgress.Presets.shades_classic);

const print = (string) =>{
    multiBar.log(string + '\n')
}
const progresBar =  multiBar.create();


module.exports = {progresBar,print};