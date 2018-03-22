const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');

const removeStopWordsFactory = require('../lib/removeStopWords');

const removeStopWords = removeStopWordsFactory({ bannedWords: ['kitten', 'parrot', 'puppy'] });

chai.use(chaiHttp);

const { expect } = chai;

const port = 3000;
const host = 'http://127.0.0.1';
const server = express();
let serverHandler;

const url = `${host}:${port}`;

server.get('/endpoint', (req, res) => {
  res.send('endpoint reached');
});

server.get('/filter', (req, res) => {
  removeStopWords(req.query.text, (err, text) => {
    res.send(text);
  });
});

before(() => {
  serverHandler = server.listen(port);
});

describe('when executing "GET" into /endpoint', () => {
  it('should return "endpoint reached"', done => {
    chai
      .request(url)
      .get('/endpoint')
      .end((req, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('endpoint reached');
      });
    done();
  });
});

describe('when executing "GET" into /filter', () => {
  it('should return HTTP status 200 with text="aaaa bbbb cccc"', done => {
    chai
      .request(url)
      .get('/filter')
      .query({ text: 'aaaa bbbb cccc' })
      .end((req, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return "cccc" with text="aa bb cccc"', done => {
    chai
      .request(url)
      .get('/filter')
      .query({ text: 'aa bb cccc' })
      .end((req, res) => {
        expect(res.text).to.equal('cccc');
        done();
      });
  });

  it('should return "" with text="aa bb cc"', done => {
    chai
      .request(url)
      .get('/filter')
      .query({ text: 'aa bb cc' })
      .end((req, res) => {
        expect(res.text).to.equal('');
        done();
      });
  });
});

after(() => {
  serverHandler.close();
});
