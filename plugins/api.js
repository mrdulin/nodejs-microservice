module.exports = function api(options) {
  const seneca = this;
  const area = 'ui';
  const actions = {
    products: 'products',
    productById: 'productById',
    createOrder: 'createOrder'
  };
  const host = '127.0.0.1';

  const senecaProductManager = seneca.client({
    host,
    port: 3001
  });

  /**
   * 获取所有商品列表
   */
  seneca.add({ area, action: actions.products }, (args, done) => {
    senecaProductManager.act({ area: 'product', action: 'fetch' }, (err, result) => {
      // console.log('result: ', result);
      done(err, { msg: '获取所有商品列表', result });
    });
  });

  /**
   * 根据id获取商品信息
   */
  seneca.add({ area, action: actions.productById }, (args, done) => {
    senecaProductManager.act(
      {
        area: 'product',
        action: 'fetch',
        criteria: 'byId',
        id: args.id
      },
      (err, result) => {
        done(err, { msg: '根据id获取商品信息', result });
      }
    );
  });

  /**
   * 新建订单
   */
  seneca.add({ area, action: actions.createOrder }, (args, done) => {
    done(null, { msg: '新建订单' });
  });

  const routes = {
    prefix: '/api',
    pin: `area:${area},action:*`,
    map: {
      products: { GET: true },
      productById: { GET: true, suffix: '/:id' },
      createOrder: { POST: true }
    }
  };

  seneca.add('init:api', (msg, respond) => {
    seneca.act('role:web', { routes }, respond);
  });
};
