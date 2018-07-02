const router = require('koa-router')();
const koaBody = require('koa-body');
const item  = require('../models/items');


    router
        .get('/items', async (ctx, next) => {
            ctx.body = await item.getAll()
        })
        .get('/items/:id', async (ctx, next) => {
            let result = await item.get(ctx.params.id);
            if (result) {
                ctx.body = result
            } else {
                ctx.status = 204
            }
        })
        .get('/item/:id', async (ctx, next) => {
            let result = await item.getItem(ctx.params.id);
            if (result) {
                ctx.body = result
            } else {
                ctx.status = 204
            }
        })
        .post('/item', koaBody(), async (ctx, next) => {
            ctx.status = 201;
            ctx.body = await item.create(ctx.request.body)
        })
        .put('/item/:id', koaBody(), async (ctx, next) => {
            ctx.status = 204;
            await item.update(ctx.params.id, ctx.request.body);
        })
        .delete('/item/:id', async (ctx, next) => {
            ctx.status = 204;
            await item.delete(ctx.params.id);
        });

module.exports =  router.routes.bind(router)      
