// 模拟内存泄漏，并通过pm2和keymetrics进行监控

const seneca = require('seneca')();

const names = [];

seneca.add({ cmd: 'memory-leak' }, (args, done) => {
  names.push(args.name);
  const result = `Hello ${args.name}`;
  done(null, { result });
});

seneca.listen({ port: 8080 });
