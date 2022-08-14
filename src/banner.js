const chalk = require("chalk");
const pkg = require("../package.json");

const banner = (isColored) => (isColored ? chalk.hex("#FFA500")(`
          _    _ _   _          __       
         | |  | | | | |        / _|      
         | |__| | |_| |_ _ __ | |_ _   _ 
         |  __  | __| __| '_ \\|  _| | | |
         | |  | | |_| |_| |_) | | | |_| |
         |_|  |_|\\__|\\__| .__/|_|  \\__, |
                        | |         __/ |
                        |_|        |___/ 
                                        ${chalk.green(`v${pkg.version}`)}

    ${chalk.cyan("A Incredible fast and Powerful HTTP toolkit")}
`) : (
    `
          _    _ _   _          __       
         | |  | | | | |        / _|      
         | |__| | |_| |_ _ __ | |_ _   _ 
         |  __  | __| __| '_ \\|  _| | | |
         | |  | | |_| |_| |_) | | | |_| |
         |_|  |_|\\__|\\__| .__/|_|  \\__, |
                        | |         __/ |
                        |_|        |___/ 
                                        ${`v${pkg.version}`}

    A Incredible fast and Powerful HTTP toolkit
`
));

module.exports = banner;
