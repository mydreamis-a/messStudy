const Sql = require("sequelize");
const Post = require("./8_post");
const User = require("./7_users");
const config = require("../config/5_config");

// ㅜ 옵션을 적용한 시퀄라이즈 객체 생성
const { database, username, password } = config.dev;
const sequelize = new Sql(database, username, password, config.dev);

const db = {};
db.sequelize = sequelize;

db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);

// ㅜ 관계형 맺어주는 함수
User.associate(db);
Post.associate(db);

// ㅜ 하나의 객체 형태로 내보내기 (db)
module.exports = db;
