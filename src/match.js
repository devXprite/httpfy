const httpfyConfig = require("./httpfyConfig");

const {
    MatchCode, MatchLength, MatchString, anyMatch,
} = httpfyConfig;

/**
 * A function to check if Response match
 *
 * @param {number} code Reponse Code
 * @param {number} length Response Length
 * @param {string} data Response Data
 * @return {boolean}
 */
const isMatch = (code, length, data) => {
    if (!anyMatch) return true;

    if (
        (typeof MatchCode === "object" ? MatchCode.test(code) : true)
        && (typeof MatchLength === "object" ? MatchLength.test(length) : true)
        && (typeof MatchString === "object" ? MatchString.test(data) : true)
    ) {
        return true;
    }
    return false;
};

module.exports = isMatch;
