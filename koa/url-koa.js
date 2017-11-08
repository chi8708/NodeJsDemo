///<reference path="../typings/tsd.d.ts" />
//导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
var Koa = require('koa');

var router=require("koa-router")();


// 创建一个Koa对象表示web app本身:
var app = new Koa();

// parse request body:

// // 对于任何请求，app将调用该异步函数处理请求：
// app.use( (ctx, next)=>{
//     //await next(); //Node.js只支持ES6 。ES7異步async await
//     ctx.response.type = 'text/html';
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
// });


//add url-route:
router.get('/hello/:name', (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body =`<h1>Hello, ${name}!</h1>`;
});

router.all('*',  function (ctx, next) {
    ctx.response.body = '<h1>Index</h1>';
});

router.all('/login', function () {
  this.redirect('/');
  this.status = 301;
});

// app.use(function (ctx,next){
//   this.body = `Invalid URL!!!${ctx.request.method} ${ctx.request.url}`;
//   ctx.response.type = 'text/html';
//   ctx.response.body = this.body;
// });

app.use(router.routes())
.use(router.allowedMethods());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
