module.exports = [
  {
    prefix: '/products',
    pin: { area: 'product', action: '*' },
    map: {
      fetch: { GET: true },
      edit: { GET: false, POST: true },
      delete: { GET: false, DELETE: true }
    }
  }
];
