const httpfyConfig = require('./httpfyConfig');

const {
  MatchCode,
  MatchLength,
  anyMatch,
} = httpfyConfig;

const isMatch = (code, length) => {
  if (!anyMatch) return true;

  if (
    ((typeof (MatchCode) === 'object') ? MatchCode.test(code) : true)
    && ((typeof (MatchLength) === 'object') ? MatchLength.test(length) : true)
  ) {
    return true;
  }
  return false;
};

module.exports = isMatch;
