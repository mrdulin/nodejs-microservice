const seneca = require('seneca')();

const productManager = require('../plugins/productManager');

const host = '127.0.0.1';
const port = 3001;

seneca
  .use('basic')
  .use('entity')
  .use(productManager)
  .listen({ host, port });
