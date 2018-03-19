module.exports = function productPlugin(options) {
  const seneca = this;
  console.log(options);
  const area = 'product';
  const actionType = {
    fetch: 'fetch',
    add: 'add',
    remove: 'remove',
    edit: 'edit'
  };

  /**
   * 获取所有商品列表
   */
  seneca.add({ area, action: actionType.fetch }, (args, done) => {
    const products = this.make$('products');
    products.list$({}, done);
  });

  /**
   * 根据分类获取商品列表
   */
  seneca.add({ area, action: actionType.fetch, criteria: 'byCategory' }, (args, done) => {
    const products = this.make$('products');
    products.list$({ category: args.category }, done);
  });

  /**
   * 根据id获取商品
   */
  seneca.add({ area, action: actionType.fetch, criteria: 'byId' }, (args, done) => {
    const products = this.make$('products');
    products.load$(args.id, done);
  });

  /**
   * 添加商品
   */
  seneca.add({ area, action: actionType.add }, (args, done) => {
    const products = this.make$('products');
    products.category = args.category;
    products.name = args.name;
    products.description = args.description;
    products.price = args.price;
    products.save$((err, product) => {
      done(err, products.data$(false));
    });
  });

  /**
   * 根据id删除商品
   */
  seneca.add({ area, action: actionType.remove }, (args, done) => {
    const product = this.make$('products');
    product.remove$(args.id, err => {
      done(err, null);
    });
  });

  /**
   * 根据id获取商品信息并编辑
   */
  seneca.add({ area, action: actionType.edit }, (args, done) => {
    seneca.act(
      {
        area,
        action: actionType.fetch,
        criteria: 'byId',
        id: args.id
      },
      (err, result) => {
        result.data$({
          name: args.name,
          category: args.category,
          description: args.description,
          price: args.price
        });

        result.save$((saveErr, product) => {
          done(err || saveErr, product.data$(false));
        });
      }
    );
  });
};
