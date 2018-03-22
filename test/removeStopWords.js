const { expect, assert, should } = require('chai');
const removeStopWordsFactory = require('../lib/removeStopWords');

const removeStopWords = removeStopWordsFactory({ bannedWords: ['kitten', 'parrot'] });
should();

describe('when executing "removeStopWords"', () => {
  it('should remove words with less than 3 chars of length', () => {
    removeStopWords('my small list of words', (err, response) => {
      expect(response).to.equal('small list words');
    });
  });

  it('should remove extra white spaces', () => {
    removeStopWords('my small      list of words', (err, response) => {
      expect(response).to.equal('small list words');
    });
  });

  it('should remove banned words', () => {
    removeStopWords('my kitten is sleeping', (err, response) => {
      expect(response).to.equal('sleeping');
    });
  });

  // it('should not fail with null as input', () => {
  //   removeStopWords(null, (err, response) => {
  //     expect(response).to.
  //   });
  // })

  it('should fail if the input is not a string', () => {
    try {
      removeStopWords(5, () => {
        assert.fail();
      });
    } catch (err) {}
  });
});
