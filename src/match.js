const httpfyConfig = require('./httpfyConfig');

const {
  MatchCode,
  MatchLineCount,
  MatchLength,
  anyMatch,
} = httpfyConfig;

const isMatch = (code, length, lineCount) => {
  if (!anyMatch) return true;

  if (
    ((typeof (MatchCode) === 'object') ? MatchCode.test(code) : true)
    && ((typeof (MatchLength) === 'object') ? MatchLength.test(length) : true)
  ) {
    return true;
  }
};

module.exports = isMatch;
