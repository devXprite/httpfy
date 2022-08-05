/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const fs = require('fs');

const throwError = (msg) => {
  console.log(chalk.redBright(msg));
  process.exit(0);
};

const genrateFolderName = () => {
  const wordCountList = {};

  fs.readFile('./tmp/urls.txt', (error, data) => {
    if (error) {
      throwError(error.message || error);
      return;
    }

    const fileData = data.toString();
    const allWords = fileData.match(/(\w+)/g);

    allWords.forEach((word) => {
      if (word.length >= 4 && !word.includes('http')) {
        if (!wordCountList?.[word]) {
          wordCountList[word] = { word, count: 0 };
        }
        wordCountList[word].count++;
      }
    });

    let maxCountWord = { count: 0 };
    for (const propName in wordCountList) {
      const currentWord = wordCountList[propName];
      if (maxCountWord.count < currentWord.count) {
        maxCountWord = currentWord;
      }
    }
    const timeStamp = Math.floor(Date.now() / 1000);

    return (maxCountWord.count > 2) ? `httpfy_${maxCountWord.word}_${timeStamp}` : `httpfy_${timeStamp}`;
  });
};

console.log(genrateFolderName());
