function contains(arr, el) {
  return arr.indexOf(el) > -1;
}

module.exports = function removeStopWords(options) {
  let bannedWords = [];
  if (typeof options !== 'undefined') {
    bannedWords = options.bannedWords || [];
  }

  return (text, callback) => {
    const words = text.split(' ');
    const validWords = [];
    words.forEach((word, index) => {
      let addWord = true;

      if (word.length < 3) {
        addWord = false;
      }

      if (addWord && contains(bannedWords, word)) {
        addWord = false;
      }

      if (addWord) {
        validWords.push(word);
      }

      if (index === words.length - 1) {
        callback(null, validWords.join(' '));
      }
    });
  };
};
