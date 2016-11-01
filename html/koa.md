# koa开发心得

我想从一个例子入手，来透露koa的本质

    app.use(async (ctx, next)=>{
        ctx.body = '1';
        await next();
        ctx.body += '2';
        console.log(ctx.body);
    });
    app.use(async (ctx, next)=>{
        ctx.body += '3';
        await next();
        ctx.body += '4';
    });
    app.use(async (ctx, next)=>{
        ctx.body += '5';
    });

上面的代码，打印出来是 13542；

造成上面的结果的原因是 co 这个东西，它是什么呢？本质上就是将多个promise合并一起执行后成的结果；

koa本身是多个中间件组成的，每个中间件都一个promise，要自动执行每个中间件，就需要用到co，或者compose；

koa-router 本身也是中间件的结合，每个路由可以看做是一个中间件；
