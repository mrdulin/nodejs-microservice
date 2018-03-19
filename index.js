const seneca = require('seneca')();
const express = require('express');
const bodyParser = require('body-parser');

const productPlugin = require('./plugins/product');

seneca.use(productPlugin);
seneca.use('mongo-store', {
  name: 'seneca',
  host: '127.0.0.1',
  port: '27017'
});

seneca.ready(err => {
  const app = express();
  const port = 3000;
  app.use(bodyParser.json());
  app.use(seneca.export('web'));

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });

  seneca.act('role:web', {
    use: {
      prefix: '/products',
      pin: { area: 'product', action: '*' },
      map: {
        fetch: { GET: true },
        edit: { GET: false, POST: true },
        delete: { GET: false, DELETE: true }
      }
    }
  });
});
