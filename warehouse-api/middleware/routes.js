const router = require("koa-router")();
const item = require("../models/items");
var multer = require("koa-multer");
const asyncBusboy = require("async-busboy");
const fs = require("fs");
var uuid = require("node-uuid");
var Jimp = require("jimp");

var config = require("config");
const FileDir = config.files.dir;

function MoveFile(path, name) {
  let promise = new Promise((resolve, reject) => {
    let filename = uuid.v4() + ".jpg";
    fs.copyFile(path, FileDir + filename, err => {
      if (err) reject(err);
      console.log("Copy complete!", FileDir + filename);
      resolve(filename);
    });
  });
  return promise;
}

function DeleteFile(path) {
  let promise = new Promise((resolve, reject) => {
    fs.unlink(path, function(error) {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
  return promise;
}

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
  .post("/item", async (ctx, next) => {
    let warnings = "";
    const { files, fields } = await asyncBusboy(ctx.req);
    let fname = "";
    if (files.length > 0) {
      fname = files[0].filename;
      let ftempfullpath = files[0].path;
      files[0].destroy();
      if (files[0].mimeType == "image/jpeg") {
        // //не будем ждать чтобы калач долго не крутился
        // MoveFile(ftempfullpath, fname)
        //   .then(fname => {
        //     return Jimp.read(FileDir + fname);
        //   })
        //   .then(logo => {
        //     return logo
        //       .scaleToFit(71, 71) // resize
        //       .write(FileDir + "logo_" + fname); // save
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   });

        fname = await MoveFile(ftempfullpath, fname);
        await Jimp.read(FileDir + fname)
          .then(logo => {
            return logo
              .scaleToFit(71, 71) // resize
              .write(FileDir + "logo_" + fname); // save
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        await DeleteFile(ftempfullpath);
        warnings = "wrong file type";
        fname = "";
      }
    }
    const { nameInput, countInput, TextAreaInput, parentId } = fields;
    let id = await item.create({
      nameInput,
      countInput,
      TextAreaInput,
      parentId,
      fname
    });
    if (id > 0) {
      ctx.body = { id: id };
      ctx.status = 200;
    } else {
      ctx.status = 409;
    }

    //ctx.body = "dfdffd";
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
module.exports.allowedMethods = router.allowedMethods.bind(router);
