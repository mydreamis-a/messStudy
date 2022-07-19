// MYSQL 연결하기

// MYSQL은 콜백 기반으로 promise를 사용을 위해서는 별도의 promise-mysql의 설치가 필요한데
// MYSQL2는 promise를 지원하기 때문에 바로 사용이 가능하다.

// MYSQL npm 설치 명령어
// npm i mysql2

// ㅜ require 함수로 모듈을 가져온다.
const mysql = require("mysql2");

// ㅜ createConnection 옵션
// ㅜ host: 연결할 호스트
// ㅜ port: 연결할 포트
// ㅜ user: 사용자의 이름
// ㅜ password: 사용자의 비밀번호
// ㅜ database: 연결할 DB 명
// ㅜ debug: 디버그 모드의 사용 여부
const temp = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test0719",
});

// ㅜ query 함수의 첫 번째 매개 변수: 쿼리문
// ㅜ 두 번째 매개 변수: 쿼리 에러, 쿼리 결과, 필드 명이 담긴 콜백 함수
temp.query("SELECT * FROM posts", (err, res) => {
  if (err) {
    console.log("error");
  } else {
    console.log(res);
  }
});

const http = require("http");

const server = http.createServer((req, res) => {
  req.statusCode = 200;
  res.write("123");
  res.end("456");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("port: ", PORT);
});

// 경로 확인: node 띄고 tap
// 실행: node src/2_main.js

// 07 19 19 수정
