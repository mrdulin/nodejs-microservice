const seneca = require('seneca')();
const SenecaWeb = require('seneca-web');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const productPlugin = require('./plugins/product');

const app = express();
const port = 3000;

app.use(bodyParser.json());

seneca
  // .use('mongo-store', {
  //   name: 'seneca',
  //   host: '127.0.0.1',
  //   port: '27017'
  // })
  // .use(productPlugin)
  .use(SenecaWeb, {
    routes,
    context: app,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false }
  })
  .ready(err => {
    const server = seneca.export('web/context')();

    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  });
