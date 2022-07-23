// 07 22 금

// express
// NODE.JS를 사용해서 서버 구성을 쉽게 할 수 있게 도와주는 클래스와 라이브러리의 집합

// express 설치 명령어
// npm i express

// ejs
// NODE.JS와 express에서 많이 사용하고 있는 템플릿 엔진
// 우리가 사용하는 기존 html 문법을 사용하면서 <% %> 처럼
// 크게 벗어나지 않게 서버와 데이터를 사용할 수 있는 장점이 있다.

// ejs 설치 명령어
// npm i ejs

// fs
// 파일 읽기 쓰기를 쉽게 도와주는 모듈

// body-parser
// 요청과 응답 사이에서 공통적인 기능을 해주는 미들 웨어
// 데이터를 body라는 객체 안에 담아서 요청 응답을 받을 수 있게 해준다.

// body-parser 설치 명령어
// npm i body-parser

const express = require("express");
const mysql = require("mysql2");
const ejs = require("ejs");
const fs = require("fs");
const bodyParser = require("body-parser");
// const { log } = require("console");

const app = express();
const PORT = 4000;

const temp = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test0722",
});

temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
  } else {
    console.log("res: ", res);
  }
});

app.use(
  bodyParser.urlencoded({
    extended: false,
    // ㅗ extended의 옵션
    // ㅗ true: express에 기본 내장된 쿼리 스트링 모듈을 사용한다.
    // ㅗ false: 좀 더 확장된 qs 모듈을 사용한다.
  })
);

// ㅜ app.get("요청 URL")
app.get("/", (req, res) => {
  // ㅜ fs 모듈로 파일을 읽어온다.
  // ㅜ readFile 파일을 읽어오는 함수 (파일 경로, 인코딩 방식, 콜백 함수)
  fs.readFile("src/2_list.html", "utf-8", (err, data) => {
    temp.query("SELECT * FROM products", (err, result) => {
      // ㅜ express에서는 end가 아닌 send로 보내기
      // ㅜ ejs.render 함수로 불러온 파일을 그려준다.
      // ㅜ 두 번째 매개 변수로 데이터를 전달할 수 있다.
      res.send(ejs.render(data, { result }));
    });
  });
});

app.get("/insert", (req, res) => {
  fs.readFile("src/3_insert.html", "utf-8", (err, data) => {
    console.log(data);
    res.send(data);
  });
});

app.post("/insert", (req, res) => {
  // ㅜ body 객체 안에 form에서 보내준 데이터는
  // ㅜ input의 name이 키 값, input의 value 값으로 전달된다.
  const data = req.body;

  const sql = "INSERT INTO products (name, number, series) VALUES (?, ?, ?)";
  temp.query(sql, [data.name, data.number, data.series], () => {
    // ㅜ redirect 함수의 매개 변수의 경로로 URL을 이동한다.
    res.redirect("/");
  });
});

function deleteRow() {
  app.post("/", (req, res) => {
    const sql = "DELETE products WHERE (`id` = '" + idx + 1 + "')";
    temp.query(sql);
    res.redirect("/");
  });
}
app.listen(PORT, () => {
  console.log("server start");
});

// 07 24 01 수정
