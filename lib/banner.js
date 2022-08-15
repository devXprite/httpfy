const chalk = require("chalk");
const updateNotifier = require("update-notifier");
const pkg = require("../package.json");

const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 5,
});

const banner = (isColored) => {
    if (isColored) {
        return (
            chalk.hex("#FFA500")(`
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
            + (notifier.update
                ? `\n\n\t   Update available ${chalk.hex("#FFA500")(`v${pkg.version}`)} -> ${chalk.greenBright(
                    `v${notifier.update.latest}`,
                )}\n\t     Run ${chalk.cyan("npm i -g httpfy")} to update\n\n`
                : "")
        );
    }
    return `
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
    ${
    notifier.update
        ? `\n\n\t   Update available v${pkg.version} -> v${notifier.update.latest}\n\t     Run 'npm i -g httpfy' to update\n\n`
        : ""
}`;
};

module.exports = banner;
