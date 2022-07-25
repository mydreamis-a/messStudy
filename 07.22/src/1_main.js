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
const { log } = require("console");

const app = express();
const PORT = 4000;

const temp = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test0722",
  multipleStatements: true,
  // ㅗ 다중 쿼리문에 대한 옵션
});

temp.query("SELECT * FROM products1", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products1(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
  } else {
    log("res: ", res);
  }
});

temp.query("SELECT * FROM products2", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products2(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
  } else {
    log("res: ", res);
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
    temp.query("SELECT * FROM products1", (err, result) => {
      // ㅜ express에서는 end가 아닌 send로 보내기
      // ㅜ ejs.render 함수로 불러온 파일을 그려준다.
      // ㅜ 두 번째 매개 변수로 데이터를 전달할 수 있다.
      res.send(ejs.render(data, { result }));
    });
  });
});

app.get("/insert", (req, res) => {
  fs.readFile("src/3_insert.html", "utf-8", (err, data) => {
    log(data);
    res.send(data);
  });
});

app.post("/insert", (req, res) => {
  // ㅜ body 객체 안에 form에서 보내준 데이터는
  // ㅜ input의 name이 키 값, input의 value 값으로 전달된다.
  const data = req.body;

  const sql = "INSERT INTO products1 (name, number, series) VALUES (?, ?, ?)";
  temp.query(sql, [req.body.name, data.number, data.series], () => {
    // ㅜ redirect 함수의 매개 변수의 경로로 URL을 이동한다.
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  // req 요청의 값을 이용해서 URL 요청에서 파라미터를 뽑을 수 있다.
  // 요청한 URL의 /:id가 vaule이자 params의 키값
  // /delete/:id 이 주소의 id가 키 값, 그 자리에 들어가는 값이 value
  // {params: {id:1}}

  // AUTO_INCREMENT: 컬럼을 추가할 때마다 id의 값이 자동으로 증가하면서 생성되는데 그 값이 남아 있음

  // UPDATE와 ALTER의 차이
  // 데이터 명령어로서 DB 관계에 저장된 데이터를 수정하는 명령어
  // 데이터의 정의 명령어로서 DB의 관계 구조를 수정하는 명령어

  const sql1 = "DELETE FROM products1 WHERE id= ?;";
  const sql2 = "SET @CNT = 0;";
  const sql3 = "UPDATE products1 SET products1.id = @CNT:=@CNT+1;";
  const sql4 = "ALTER TABLE products1 AUTO_INCREMENT = 0;";

  temp.query(sql1, [req.params.id], () => {
    temp.query(sql2 + sql3 + sql4, () => {
      res.redirect("/");
    });
  });
});

app.get("/edit/:id", (req, res) => {
  fs.readFile("src/4_edit.html", "utf-8", (err, data) => {
    temp.query(
      "SELECT * FROM products1 WHERE id = ?",
      [req.params.id],
      (err, result) => {
        log(result);
        res.send(ejs.render(data, { result: result[0] }));
      }
    );
  });
});

app.post("/edit/:id", (req, res) => {
  const { name, number, series } = req.body;
  const sql = "UPDATE products1 SET name=?, number=?, series=? WHERE id=?";
  temp.query(sql, [name, number, series, req.params.id], () => {
    res.redirect("/");
  });
});

app.get("/test", (req, res) => {
  const sql1 = "SELECT * FROM products1;";
  const sql2 = "SELECT * FROM products2;";
  temp.query(sql1 + sql2, (err, result) => {
    log(result[0]);
    log(result[1]);
  });
});

app.post("/delete", (req, res) => {
  const sql = "DELETE FROM products1 WHERE id= ?";
  log(req.body.idx);
  temp.query(sql, [req.body.idx], () => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  log("server start");
});

// 07 25 11 수정
