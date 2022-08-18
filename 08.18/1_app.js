// 08 18 목

// 관계형 DB
// swquelize 및 FOREIGN KEY 사용

// ㅜ mysql2, dotenv
const config = require("./2_config");
const mysql = require("mysql2");
const { log } = console;

const client = mysql.createConnection(config.dev1);

// ㅜ ALTER: 테이블 속성 변경
// FOREIGN KEY 추가하는데 orders 테이블의 user_id와 users 테이블의 id를 연결시킨다.

// const sql1 = "CREATE TABLE users (id INT AUTO_INCREMENT, username varchar(255), PRIMARY KEY (id));";
// const sql2 = "CREATE TABLE items (id INT AUTO_INCREMENT, name varchar(255), price INT, image varchar(255), PRIMARY KEY (id));";
// const sql3 = "CREATE TABLE orders (id INT AUTO_INCREMENT, user_id INT, total_price INT, created_at datetime DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
// const sql4 = "CREATE TABLE order_items (id INT AUTO_INCREMENT, order_id INT, item_id INT, order_quantity INT, PRIMARY KEY (id));";
// const sql5 = "ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);";
// const sql6 = "ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES orders (id);";
// const sql7 = "ALTER TABLE order_items ADD FOREIGN KEY (item_id) REFERENCES items (id);";
// const sql8 = `INSERT INTO items (name, price, image) VALUES
//     ("첫 번째", 1000, "/"),
//     ("두 번째", 2000, "/"),
//     ("세 번째", 3000, "/"),
//     ("네 번째", 4000, "/");`;
// const sql9 = `INSERT INTO users (username) VALUES ("안녕");`;

// client.query(sql1 + sql2 + sql3 + sql4);
// client.query(sql5 + sql6 + sql7);
// client.query(sql8 + sql9);

// ㅜ INNER JOIN 두 개의 테이블이 참조된 공통된 부분만 합치는 것
const sql13 = `SELECT orders.id, orders.created_at,
orders.total_price, items.name, items.price, items.image,
order_items.order_quantity FROM items
INNER JOIN order_items ON (order_items.item_id = items.id)
INNER JOIN orders ON (orders.id = order_items.order_id)
WHERE (orders.user_id = ?)`;

client.query(sql13, [1], (err, result) => {
  log(result);
});
