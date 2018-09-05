var query = require("mysql-query-promise");
var config = require("config");

const tableName = config.item.tableName;

function isNumber(obj) {
  return !isNaN(parseFloat(obj));
}

const crud = {
  getBreadcrumbs: async id => {
    let Breadcrumbs = await query(
      `WITH RECURSIVE cte (item, BOX, name) AS
      ( SELECT item,
               BOX,
               name
       FROM relation
       JOIN items ON relation.box = items.id
       WHERE item = ?
       UNION ALL SELECT p.item,
                        p.box,
                        i.name
       FROM relation p
       JOIN items i ON p.box = i.id
       INNER JOIN cte ON p.item = cte.box )
    SELECT BOX,
           name
    FROM cte;`,
      [Number(id)]
    );
    Breadcrumbs = Breadcrumbs.reverse();
    return Breadcrumbs;
  },
  getROOT: async () => {
    return query(`SELECT * from ParentItem`);
  },
  getALL: async () => {
    return query(`SELECT * from NotBox`);
  },
  getItem: async id => {
    //опредялем тип id

    /*заполнить обект  */
    let item = {
      id: "",
      type: "",
      name: "",
      date: "",
      comment: "",
      count: "",
      breadcrumbs: "",
      imgUrl: "/noimg_m.jpg",
      content: "",
      count_type: "",
      count_mach: "",
      count_many: "",
      date_changed: "",
      date_created: "",
      date_moved: ""
    };

    if (!isNumber(id)) {
      // id передан по имени. имя уникально поэтому значение только одно. иначе ошибка в переданом имени
      let sqlid = await query(`SELECT id,name FROM ${tableName} WHERE name=?`, [
        id
      ]);
      if (sqlid.length != 1) {
        return item;
      }
      item.id = sqlid[0].id;
      item.name = sqlid[0].name;
      return item;
    }
    //запрос основный данных
    let Info = await query(
      `SELECT * FROM items LEFT  JOIN relation  ON  items.id = relation.item WHERE items.id=?`,
      [Number(id)]
    ); //count_type, count_mach,  count_many,
    //запрос списка родителей
    let Breadcrumbs = await query(
      `WITH RECURSIVE cte (item, BOX, name) AS
      ( SELECT item,
               BOX,
               name
       FROM relation
       JOIN items ON relation.box = items.id
       WHERE item = ?
       UNION ALL SELECT p.item,
                        p.box,
                        i.name
       FROM relation p
       JOIN items i ON p.box = i.id
       INNER JOIN cte ON p.item = cte.box )
    SELECT BOX,
           name
    FROM cte;`,
      [Number(id)]
    );
    Breadcrumbs = Breadcrumbs.reverse();

    /*
          count_type: "",
      count_mach: "",
      count_many: "
       */

    let content = await query(
      `SELECT relation.id as rel_id,  items.id as item_id,  relation.date_changed as date, items.name as name,items.curr_count as item_count,items.logo as item_img   FROM relation join items on  relation.item = items.id  WHERE box=?`,
      [Number(id)]
    );
    item.id = Info[0].id;
    item.parentId = Info[0].box;
    item.name = Info[0].name;
    item.count = Info[0].curr_count;
    item.date = Info[0].date;
    item.comment = Info[0].comment;
    if (Info[0].logo !== "") item.item_img = Info[0].logo;
    item.breadcrumbs = Breadcrumbs;
    if (content.length > 0) item.type = "box";
    else item.type = "item";
    item.content = content;
    item.count_type = Info[0].count_type;
    item.count_mach = Info[0].count_mach;
    item.count_many = Info[0].count_many;
    item.date_changed = Info[0].date_changed;
    item.date_created = Info[0].date_created;
    item.date_moved = Info[0].date_moved;
    /*count_mach:1
count_many:"много"
count_type:"mach"
curr_count:"1шт"
date_changed:Wed Jul 04 2018 13:23:59 GMT+0700 (Новосибирское стандартное время) {}
date_created:Sun Aug 05 2018 23:33:13 GMT+0700 (Новосибирское стандартное время) {}
date_moved:Tue Sep 04 2018 19:16:02 G */

    /*
      item.count = qlid[0].curr_count;
      item.date = qlid[0].date;
      item.item_img = qlid[0].logo; */

    return item;
  },
  getContent: async id => {
    let products = await query(
      `SELECT relation.id as rel_id, items.id as item_id, relation.date as date, items.name as name,items.curr_count as item_count,items.logo as item_img    FROM relation join items on  relation.item = items.id  WHERE box=?`,
      [Number(id)]
    );
    return products;
  },
  //create
  create: async function({
    nameInput,
    countInput,
    TextAreaInput,
    parentId,
    fname
  }) {
    let id = await query(
      "INSERT INTO  items (name,curr_count,comment,logo) VALUE (?,?,?,?)",
      [nameInput, countInput, TextAreaInput, fname]
    );

    if (id.affectedRows == 1) id = id.insertId;
    let res = await query("INSERT INTO  relation (box,item) VALUE   (?,?)", [
      parentId,
      id
    ]);
    let errorLog = "";
    let commentLog = "";
    if (res.affectedRows == 1) {
      //запишем в лог об успехе
      errorLog = 0;
      commentLog = `Создан новый предмет <${nameInput}>`;
    } else {
      //да плохо все в общем
      errorLog = 1;
      commentLog = `Ошибка создания новыго предмета <${nameInput}>`;
    }
    await query("INSERT INTO  log (type,box,item,comment) VALUE   (?,?,?,?)", [
      errorLog,
      parentId,
      id,
      commentLog
    ]);
    return id;

    /*
    let product = {
      name: String(name),
      price: Number(price),
      currency: String(currency)
    };
    if (id > 0) product.id = Number(id);
    let result = await query(
      `INSERT INTO ${tableName} SET ? ON DUPLICATE KEY UPDATE ?`,
      [product, product]
    );
    if (result.insertId) id = result.insertId;
    return crud.get(id);
    */
  },
  update: async (id, product) => {
    if (typeof product === "object") {
      let uProduct = {};
      if (product.hasOwnProperty("name")) uProduct.name = String(product.name);
      if (product.hasOwnProperty("price"))
        uProduct.price = Number(product.price);
      if (product.hasOwnProperty("currency"))
        uProduct.currency = String(product.currency);
      let result = await query(`UPDATE ${tableName} SET ? WHERE id=?`, [
        uProduct,
        Number(id)
      ]);
      return result.affectedRows;
    }
  },
  delete: async id => {
    let result = await query(`DELETE FROM ${tableName} WHERE id=?`, [
      Number(id)
    ]);
    return result.affectedRows;
  }
};
//export default crud;
module.exports = crud;
