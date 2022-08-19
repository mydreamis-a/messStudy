// ㅜ .env 파일의 값이 숫자로만 구성될 경우에는 큰 따옴표 사용 필수 (세미콜론은 주의)
const dot = require("dotenv").config();
//
// ㅜ DB 접속에 필요한 설정 값의 객체
const config = {
  dev: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "test0819",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
// ㅜ 하나의 객체 형태로 내보내기 (config)
module.exports = config;
