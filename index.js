const seneca = require('seneca')();
const SenecaWeb = require('seneca-web');
const express = require('express');
const bodyParser = require('body-parser');
const expressAdapter = require('seneca-web-adapter-express');

const api = require('./plugins/api');
// const routes = require('./routes');

const port = 3000;
const app = express();

app.use(bodyParser.json());

seneca
  // .use('mongo-store', {
  //   name: 'seneca',
  //   host: '127.0.0.1',
  //   port: '27017'
  // })
  .use(SenecaWeb, {
    // routes,
    context: app,
    adapter: expressAdapter,
    options: { parseBody: false }
  })
  .use(api)
  .ready(err => {
    if (err) throw err;
    const server = seneca.export('web/context')();

    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  });
