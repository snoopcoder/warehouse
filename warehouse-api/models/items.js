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
      item_img: "noimg.jpg",
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
      `SELECT items.id as id, name, item_img, date_created, comment, box, date_changed,date_moved,count_type,count_many,count_mach, relation.id as rel_id  FROM items LEFT  JOIN relation  ON  items.id = relation.item WHERE items.id=?`,
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
      `SELECT relation.id as rel_id,  items.id as item_id,  relation.date_changed as date, items.name as name,items.curr_count as item_count,items.item_img as item_img   FROM relation join items on  relation.item = items.id  WHERE box=?`,
      [Number(id)]
    );
    item.id = Info[0].id;
    item.parentId = Info[0].box;
    item.rel_id = Info[0].rel_id;
    item.name = Info[0].name;
    item.comment = Info[0].comment;
    if (Info[0].item_img !== "") item.item_img = Info[0].item_img;
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

    return item;
  },
  getContent: async id => {
    let products = await query(
      `SELECT relation.id as rel_id, items.id as item_id, relation.date as date, items.name as name,items.curr_count as item_count,items.item_img as item_img    FROM relation join items on  relation.item = items.id  WHERE box=?`,
      [Number(id)]
    );
    return products;
  },
  //create
  create: async function(Items) {
    let res = "";
    try {
      res = await query(`call insertItem(?,?,?,?)`, [
        Items.name,
        Items.comment,
        Items.item_img,
        Items.parentId
      ]);
    } catch (e) {
      console.log("error in UPDATE of items.js", e);
      return 0;
    }

    if (!(res[0][0].id > 1)) {
      return 0;
    }
    return res[0][0].id;

    // let id = await query(
    //   "INSERT INTO  items (name,curr_count,comment,item_img) VALUE (?,?,?,?)",
    //   [nameInput, countInput, TextAreaInput, fname]
    // );

    // if (id.affectedRows == 1) id = id.insertId;
    // let res = await query("INSERT INTO  relation (box,item) VALUE   (?,?)", [
    //   parentId,
    //   id
    // ]);
    // let errorLog = "";
    // let commentLog = "";
    // if (res.affectedRows == 1) {
    //   //запишем в лог об успехе
    //   errorLog = 0;
    //   commentLog = `Создан новый предмет <${nameInput}>`;
    // } else {
    //   //да плохо все в общем
    //   errorLog = 1;
    //   commentLog = `Ошибка создания новыго предмета <${nameInput}>`;
    // }
    // await query("INSERT INTO  log (type,box,item,comment) VALUE   (?,?,?,?)", [
    //   errorLog,
    //   parentId,
    //   id,
    //   commentLog
    // ]);
    // return id;
  },
  update: async Items => {
    //ToDo вызывается даже если не внесены изменения ни в одно поле
    if (typeof Items === "object") {
      let oldItems = {};
      try {
        //запрос основных данных
        oldItems = await query(
          `SELECT items.id as id, name, item_img, date_created, comment, box, date_changed,date_moved,count_type,count_many,count_mach, relation.id as rel_id  FROM items LEFT  JOIN relation  ON  items.id = relation.item WHERE items.id=?`,
          [Number(Items.id)]
        );
      } catch (e) {
        console.log("error in select of items.js", e);
        return 0;
      }
      if (oldItems.length != 1) {
        return 0;
      }

      oldItems = oldItems[0];

      let chahgeDetect = false;
      let moveDetect = false;
      let item_imgChangeDetect = false;

      //TODO здесь нужны транзакции
      if (
        oldItems.name != Items.name ||
        oldItems.comment != Items.comment ||
        oldItems.count_type != Items.count_type ||
        oldItems.count_mach != Items.count_mach ||
        oldItems.count_many != Items.count_many
      )
        chahgeDetect = true;
      if (oldItems.box != Items.box) moveDetect = true;
      if (oldItems.item_img != Items.item_img) item_imgChangeDetect = true;
      //внесение изменений без перемещения
      let res = "";
      try {
        res = await query(
          `update relation,items set items.name=? , items.comment=?, relation.date_changed=now(), relation.count_type=?,relation.count_mach=?, relation.count_many=?  where relation.id=? and items.id=?`,
          [
            Items.name,
            Items.comment,
            Items.count_type,
            Items.count_mach,
            Items.count_many,
            Items.rel_id,
            Items.id
          ]
        );
      } catch (e) {
        console.log("error in UPDATE of items.js", e);
        return 0;
      }

      if (!(res.changedRows == 2 || res.changedRows == 1)) {
        return 0;
      }
      return Items.id;

      //если изменилось имя то обновляем его
      //если изменилиь картинки то обрабатываем (лишние преносим в таблицу удаления, новые забираем из нее)
      // если изменилось колиество одного из типов или изменился тип обрабатываем
      //если изменилась коробка, то тут нужен анализ количества, и расщепление если нужно

      // нужно обновить время в друх полях
      // первое только если изменился родитель
      // второе сли изменения в количестве  имени или комментариях
      // будет 3 запроса
      // 1 внести данные
      // 2 обновить время перемещения
      // 3 обновить вермя изменения

      // дополнительно заполнить лог внесенных изменений

      // if (typeof product === "object") {
      //   let uProduct = {};
      //   if (product.hasOwnProperty("name")) uProduct.name = String(product.name);
      //   if (product.hasOwnProperty("price"))
      //     uProduct.price = Number(product.price);
      //   if (product.hasOwnProperty("currency"))
      //     uProduct.currency = String(product.currency);
      //   let result = await query(`UPDATE ${tableName} SET ? WHERE id=?`, [
      //     uProduct,
      //     Number(id)
      //   ]);
      //   return result.affectedRows;
      // }
    }
    return 0;
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
