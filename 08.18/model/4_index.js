// ㅜ mysql2, sequelize 설치 후 sequelize 사용
const config = require("../2_config");
const Sequelize = require("sequelize");
const User = require("./5_users");

const { database, username, password } = config.dev2;
const sequelize = new Sequelize(database, username, password, config.dev2);

const db = {};

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;
