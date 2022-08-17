#!/usr/bin/env node

const boxen = require("boxen");
const chalk = require("chalk");
const pkg = require("../package.json");

(async () => {
    console.log(
        `\n\n\n${boxen(
            `${chalk.hex("#FFA500")(
                `Thank You for Installing Httpfy@${pkg.version}`,
            )} \n ${chalk.gray(
                `\nType ${chalk.cyanBright("httpfy -h")} for Help Menu \nDon't forget to give this project a star!`,
            )}`,
            {
                padding: 1,
                borderColor: "cyanBright",
                textAlignment: "center",
                margin: 1,
                borderStyle: "round",
            },
        )}\n\n\n`,
    );
})();
