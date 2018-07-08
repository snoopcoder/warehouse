var query = require("mysql-query-promise");
var config = require("config");
const tableName = config.item.tableName;

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
    /*заполнить обект  */
    let item = {
      id: "",
      type: "",
      name: "",
      date: "",
      count: "",
      breadcrumbs: "",
      imgUrl: "/noimg_m.jpg",
      content: ""
    };

    let Info = await query(`SELECT * FROM ${tableName} WHERE id=?`, [
      Number(id)
    ]);
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

    let content = await query(
      `SELECT relation.id as rel_id, items.id as item_id, relation.date as date, items.name as name,items.curr_count as item_count  FROM relation join items on  relation.item = items.id  WHERE box=?`,
      [Number(id)]
    );
    item.id = Info[0].id;
    item.name = Info[0].name;
    item.count = Info[0].name.curr_count;
    item.breadcrumbs = Breadcrumbs;
    if (content.length > 0) item.type = "box";
    else item.type = "item";
    item.content = content;

    return item;
  },
  getContent: async id => {
    let products = await query(
      `SELECT relation.id as rel_id, items.id as item_id, relation.date as date, items.name as name,items.curr_count as item_count  FROM relation join items on  relation.item = items.id  WHERE box=?`,
      [Number(id)]
    );
    return products;
  },
  create: async function({ id, name, price = 0, currency = "UAH" }) {
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
