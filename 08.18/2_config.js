const dot = require("dotenv").config();

const config = {
  dev1: {
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "test0818",
    multipleStatements: true,
  },
  dev2: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "test0818_new",

    // ㅜ 호스트 주소
    host: "127.0.0.1",

    // ㅜ 사용할 DB
    dialect: "mysql",
  },
};

module.exports = config;
