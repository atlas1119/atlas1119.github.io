'use strict';

import koa from 'koa';
import sendfile from 'koa-sendfile';
import path from 'path';
import serve from 'koa-static';
var router = require('koa-router')();

var app=new koa();

app.use(require('koa-bodyparser')());
app.use(require('koa-logger')());

app.use(serve(__dirname));

router.get('/', async (ctx, next)=>{

    await sendfile(ctx, `index.html`);
});



app.use(router.routes()).use(router.allowedMethods());

const PORT = 8028;
app.listen(PORT, function() {
    console.log('Production koa server running at localhost:' + PORT);
});
