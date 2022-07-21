// 07 20 수

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

// 07 21 목

// ㅜ query 함수의 첫 번째 매개 변수: 쿼리문
// ㅜ 두 번째 매개 변수: 쿼리 에러, 쿼리 결과, 필드 명이 담긴 콜백 함수
temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
  } else {
    console.log("res: ", res);
  }
});

const http = require("http");

const server = http.createServer((req, res) => {
  req.statusCode = 200;

  // ㅜ 한글이 깨질 때는 인코딩 방식을 정해보자.
  // ㅜ res setHeader(내용) 함수를 사용해서 헤더의 정보를 설정할 수 있다.
  // ㅜ utf-8로 컨텐츠 내용의 인코딩 속성을 추가한다.
  res.setHeader("Content-Type", "application/json", "charset=utf-8");

  // req.url: 요청된 url 확인
  // req.method: 요청된 method 확인

  const URL = req.url;
  switch (URL) {
    case "/":
      res.end("메인 페이지");
      break;
    case "/list":
      temp.query("SELECT * FROM products", (err, data) => {
        if (err) {
          console.log("error: ", err);
        } else {
          // ㅜ data: products 테이블 안의 컬럼 내용
          res.end(JSON.stringify(data));
        }
      });
      break;
    case "/add":
      // ㅜ 두 번째 매개 변수로 배열 타입을 추가할 수 있다.
      // eslint-disable-next-line no-case-declarations
      const sql =
        "INSERT INTO products (name, number, series) VALUES (?, ?, ?)";
      temp.query(sql, ["Jang", "28", ""]);
      break;
    default:
      break;
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("port: ", PORT);
});

// 경로 확인: node 띄고 tap
// 실행: node src/2_main.js

// npdemon: 자동으로 모디터링 해서 js의 내용이 변경되면 서버를 재시작해주는 툴

// nodemon 설치 명령어
// npm install --save-dev nodemon

// nodemon 삭제 명령어
// npm uninstall -g nodemon

// package.json 파일의 scripts: start 부분 nodemon으로 수정 후 npm start로 실행

// 07 21 19 수정
