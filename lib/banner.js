const chalk = require("chalk");
const pkg = require("../package.json");

const banner = (isColored) => (isColored
    ? chalk.hex("#FFA500")(`
          _    _ _   _          __       
         | |  | | | | |        / _|      
         | |__| | |_| |_ _ __ | |_ _   _ 
         |  __  | __| __| '_ \\|  _| | | |
         | |  | | |_| |_| |_) | | | |_| |
         |_|  |_|\\__|\\__| .__/|_|  \\__, |
                        | |         __/ |
                        |_|        |___/ 
                                        ${chalk.green(`v${pkg.version}`)}

    ${chalk.cyan(pkg.description)}
`)
    : `
          _    _ _   _          __       
         | |  | | | | |        / _|      
         | |__| | |_| |_ _ __ | |_ _   _ 
         |  __  | __| __| '_ \\|  _| | | |
         | |  | | |_| |_| |_) | | | |_| |
         |_|  |_|\\__|\\__| .__/|_|  \\__, |
                        | |         __/ |
                        |_|        |___/ 
                                        ${`v${pkg.version}`}

    ${pkg.description}
`);

module.exports = banner;
