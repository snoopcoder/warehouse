const router = require("koa-router")();
const item = require("../models/items");
var multer = require("koa-multer");
const upload = multer();

router
  .get("/root", async (ctx, next) => {
    let result = await item.getROOT();
    //ctx.body = await item.getROOT();
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  })
  .get("/breadcrumbs/:id", async (ctx, next) => {
    let result = await item.getBreadcrumbs(ctx.params.id);
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  })
  .get("/item/:id", async (ctx, next) => {
    let result = await item.getItem(ctx.params.id);
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  })
  .get("/content/:id", async (ctx, next) => {
    let result = await item.getContent(ctx.params.id);
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  })
  .post("/item", async (req, res, next) => {
    let body = req.body;
    req.status = 201;
    //ctx.body = await item.create(ctx.request.body);
  })
  .put("/item/:id", async (ctx, next) => {
    ctx.status = 204;
    await item.update(ctx.params.id, ctx.request.body);
  })
  .delete("/item/:id", async (ctx, next) => {
    ctx.status = 204;
    await item.delete(ctx.params.id);
  });

module.exports = router.routes.bind(router);
