# nodejs-microservice

使用`seneca`及相关插件, `express`, `node.js`，`mongodb`搭建微服务

**说明：**

node: v8.4.0
npm: v5.3.0
其他依赖，见`package.json`

* `plugins`: `seneca`插件目录

* `services`: `seneca`微服务，生产环境时，微服务是分布式的，本项目为方便测试，不同微服务使用相同 host(127.0.0.1)的不同端口，例如`productManager`微服务使用`http://127.0.0.1:3001`

* `plugins/api.js`: 是 api 聚合插件，通过调用各个微服务（如`productManager`）用于给前端 ui 提供 api

* `plugins/productManager.js`: 是一个具体的“商品管理服务”

**使用：**

1.  以`productManager`服务为例, 通过`node services/productManager.js`等启动微服务，使用

```bash
curl -d  '{"area": "product", "action": "test"}' http://localhost:3001/act
```

测试`productManager`服务是否正常

2.  `npm start`启动`seneca`整合了`express.js`的应用

3.  通过浏览器访问`http://localhost:3000/api/products`等获取数据，或者通过`curl`测试
